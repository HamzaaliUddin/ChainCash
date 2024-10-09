import Modal from "@/components/Modal";
import { getTradesConfirm, getTradesQuotation } from "@/utils/capitual";
import axios from "axios";
import addDepositRequest from "pages/api/addDepositRequest";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Context } from "../Context/Context";
import getTax from "pages/api/getTax";

function ConfirmModal({ visibleModal, closeModal }: { visibleModal: any; closeModal: any; accountInfo?: any }) {
    const [taxValues, setTaxValues] = useState({
        normalUserTax: "3.5",
        specialUserTax: "0.9",
    });
    const [visible, setVisible] = useState(!!visibleModal);
    const [price, setPrice] = useState(0);
    const [secLeft, setSecLeft] = useState(5);
    const [taxNormal, setTaxNormal] = useState();
    const [totalTaxVal, setTotalTaxValue] = useState();
    const { t } = useTranslation();
    const { user } = useContext(Context);

    const getPrice = async () => {
        setPrice(0);
        const usdPrice = await axios.get(`/api/getPrice?coin=${visibleModal.coin}`).then((r) => r.data);
        setPrice(usdPrice.name);
    };

    useEffect(() => {
        setVisible(!!visibleModal);
        if (!!visibleModal) {
            getPrice();

            // let secs = 5;
            // setInterval(() => {
            //     setSecLeft(secs);
            //     if (secs <= 0) {
            //         secs = 5;
            //         getPrice();
            //     } else {
            //         secs -= 1;
            //     }
            // }, 500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleModal]);

    const fetchData = async () => {
        try {
            const data = await getTax();
            if (data && data.length > 0) {
                const taxData = data[0];
                setTaxValues({
                    normalUserTax: taxData.normalUserTax,
                    specialUserTax: taxData.specialUserTax,
                });
                setTaxNormal(taxData.normalUserTax);
            }
        } catch (error) {
            console.error("Error fetching tax values: ", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const confirm = async () => {
        try {
            const { quote_id } = await getTradesQuotation(visibleModal.coin);

            await axios.post(`https://api.iugu.com/v1/transfers?api_token=${user?.iuguSubaccount?.user_token}`, {
                receiver_id: "FBB0314E371942A8B30C331BA3CF6047",
                amount_cents: visibleModal.amount * 100
            })

            const order = await getTradesConfirm(quote_id, user?.isAdmin ? (price * visibleModal.amount).toString() : (price * visibleModal.amount * (Number(user?.tier) / 100)).toString());
            const createInvoice = await axios
                .post("/api/createIuguSession", {
                    cpf: user?.CPF || "",
                    cnpj: user?.CNPJ || "",
                    username: user?.userName || "",
                    email: user?.email || "",
                    price,
                    quantity: visibleModal.amount,
                    isAllowed: true,
                    order
                })
                .then((r) => r.data);

            if (createInvoice.errors) {
                return toast.error(t("overviewCategory.fielderror"));
            }
            toast.success("Please check your email for invoice details");

            let interval = setInterval(async () => {
                const iuguSessions = await axios.get("/api/getIuguSessions").then((r) => r.data);
                const currentSession = iuguSessions.find((i: any) => i.id === createInvoice.id);
                if (currentSession && currentSession?.status === "paid") {
                    await addDepositRequest({ ...visibleModal, order });
                    toast.success(t("overviewCategory.requestsent"));
                    closeModal(true);
                    clearInterval(interval);
                }
            }, 5000);
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message)
        }
    };

    return (
        <Modal
            visible={visible}
            onClose={() => {
                setVisible(false);
                closeModal(false);
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        marginBottom: "20px",
                        marginTop: "20px",
                    }}
                >
                    <p
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        {t("words.sendrequestdesc")}?
                    </p>
                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "17px",
                                    fontWeight: "medium",
                                    marginBottom: "10px",
                                }}
                            >
                                1 {visibleModal.coin} ={" "}
                                {user?.isAdmin ? (
                                    Number(price?.toFixed(3)) +
                                    Number(price?.toFixed(3))
                                ).toFixed(3) : (
                                    Number(price?.toFixed(3)) +
                                    Number(price?.toFixed(3)) * (Number(user?.tier) / 100)
                                ).toFixed(3)}{" "}
                                BRL
                            </p>
                            <p
                                style={{
                                    fontSize: "17px",
                                    fontWeight: "medium",
                                    marginBottom: "10px",
                                }}
                            >
                                {/* {visibleModal.amount} {visibleModal.coin} = {(price * visibleModal.amount).toFixed(3)}{" "} */}
                                {(
                                    (user?.isAdmin ? (Number(price.toFixed(3)) + Number(price.toFixed(3))) : (Number(price.toFixed(3)) + Number(price.toFixed(3)) * (Number(user?.tier) / 100))) *
                                    visibleModal.amount
                                ).toFixed(3)}
                                BRL
                            </p>
                            <p
                                style={{
                                    fontSize: "17px",
                                    fontWeight: "medium",
                                    marginBottom: "10px",
                                }}
                            >
                                {/* Tax = {Number(user?.tier)}% */}
                                {/* Tax ={" "}
                                {(
                                    parseFloat((price * visibleModal.amount).toFixed(3)) *
                                    (Number(user?.tier) / 100)
                                ).toFixed(3)}{" "}
                                <br /> */}
                                {/* Total With Tax ={" "}
                                {(
                                    price * visibleModal.amount +
                                    ((price * visibleModal.amount) / 100) * parseInt(taxNormal ? taxNormal : "0")
                                ).toFixed(3)}{" "} */}
                            </p>
                        </div>
                    </div>

                    {/* <p>Prices will be updated in {secLeft} seconds.</p> */}

                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            gap: "10px",
                            padding: "10px",
                            backgroundColor: "#31b099",
                            borderRadius: "10px",
                            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.25)",
                            // border: "1px solid rgba(0, 0, 0, 0.1)",
                            fontWeight: "bold",
                            cursor: "pointer",
                            textAlign: "center",
                            marginTop: "20px",
                            color: "white",
                        }}
                        onClick={confirm}
                        role="button"
                        tabIndex={0}
                    >
                        {t("overviewCategory.confirm")}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
