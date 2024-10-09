import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import axios from "axios";
import cn from "classnames";
import "core-js/stable";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../Context/Context";
import styles from "./Fiat.module.sass";
import getUser from "pages/api/getUser";

const cards = [
    {
        title: "BTC",
        value: "BTC",
    },
    {
        title: "ETH",
        value: "ETH",
    },
    {
        title: "USDC",
        value: "USDC_POLYGON",
    },
    {
        title: "USDT",
        value: "USDT_POLYGON",
    },
    {
        title: "Matic",
        value: "MATIC_POLYGON_AMOY",
    },
    {
        title: "BNB",
        value: "BNB_TEST",
    },
];

type FiatProps = {
    className?: string;
};

const Fiat = ({ className }: FiatProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [card, setCard] = useState<string>(cards[4].value);
    const [receiver, setReceiver] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useContext(Context);
    const [value, setValue] = useState<any>({
        in: "1",
        for: "",
    });

    const { t } = useTranslation();

    const handleChange = (value: string) => setCard(value);

    const newCharge = async () => {
        try {
            setLoading(true);
            const User = await getUser(user.uid);
            if (user?.clientIdVerified === false) {
                toast.error("Please complete your Kyc");
                setLoading(false);
                return;
            }
            if (user?.freezeType) {
                // toast.error("Your Account is Freeze");
                toast.error(t("overviewCategory.youraccountisfreeze"));
                setLoading(false);
                return;
            }
            if (receiver || user?.wallet?.address) {
                if (parseFloat(value.in) > 0) {
                    const amount = parseFloat(value.in);
                    const newValues = {
                        amount,
                        card,
                        receiver: receiver || user?.wallet?.address,
                    };

                    const totalTokens = await axios
                        .get("https://api.coingecko.com/api/v3/search/trending")
                        .then((r) => r.data);
                    const selectedCoin = totalTokens.coins.find(
                        (token: any) => token.item.symbol === card.split("_")[0].toUpperCase()
                    )?.item;

                    const createInvoice = await axios
                        .post("/api/createIuguSession", {
                            cpf: user?.CPF || "",
                            cnpj: user?.CNPJ || "",
                            username: user?.userName || "",
                            email: user?.email || "",
                            price: selectedCoin?.data?.price || 1,
                            quantity: newValues.amount,
                        })
                        .then((r) => r.data);

                    if (createInvoice.errors) {
                        setLoading(false);
                        return toast.error(t("overviewCategory.fielderror"));
                    }

                    toast.success("Please check your email for invoice details");

                    let interval = setInterval(async () => {
                        const iuguSessions = await axios.get("/api/getIuguSessions").then((r) => r.data);
                        const currentSession = iuguSessions.find((i: any) => i.id === createInvoice.id);
                        if (currentSession && currentSession?.status === "paid") {
                            toast.success(t("overviewCategory.successfullypaid"));
                            clearInterval(interval);
                        }
                    }, 5000);

                    setLoading(false);
                } else {
                    toast.error(t("overviewCategory.minimum") + " 1 BRLS");
                    setLoading(false);
                }
            } else {
                toast.error(t("overviewCategory.walletnotavailable"));
                setLoading(false);
            }
        } catch (err: any) {
            console.log(err.response.data);
            setLoading(false);
            toast.error(err.response.data.errors[0].message || err.message || t("overviewCategory.fielderror"));
        }
    };

    const kyc = async () => {
        try {
            const session = await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/session`, {
                    clientId: user?.clientId,
                    userId: user?.uid,
                    displayName: user?.displayName,
                })
                .then((res) => res.data);
            let popup = window.open(
                session?.redirectUrl,
                "ModalPopUp",
                "toolbar=no," +
                    "scrollbars=no," +
                    "location=no," +
                    "statusbar=no," +
                    "menubar=no," +
                    "resizable=0," +
                    "width=700," +
                    "height=600"
            );

            popup?.focus();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button className={cn("button", className)} onClick={() => setVisibleModal(true)}>
                <Icon name="transfer" />
                <span>{t("overviewCategory.fiat")}</span>
            </button>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => {
                    setVisibleModal(false);
                }}
            >
                <>
                    <div className={styles.title}>{t("overviewCategory.fiatCrypto")}</div>
                    <div className={styles.info}>
                        Please enter user information that you want to receive crypto and enter amount
                    </div>
                    {user?.clientIdVerified === false && (
                        <div
                        className={styles.info}
                        style={{
                            color: "#FF0000",
                        }}
                    >
                        {t("overviewCategory.verifyDesc")}
                        <button
                            style={{
                                backgroundColor: "#23978D",
                                color: "white",
                                marginLeft: "6px",
                                fontWeight: "bold",
                                padding: "5px",
                                borderRadius: "5px",
                            }}
                            onClick={kyc}
                        >
                            {t("kyc.verify")}
                        </button>
                    </div>
                    )}
                    <Select
                        className={styles.field}
                        classToggle={styles.toggleSelect}
                        label={t("overviewCategory.chooseAssets")}
                        value={card}
                        onChange={handleChange}
                        options={cards}
                    />
                    <Field
                        className={styles.field}
                        label={t("overviewCategory.recieveraddress")}
                        placeholder={t("overviewCategory.recieveraddress")}
                        value={user?.wallet?.address || receiver}
                        onChange={(e: any) => setReceiver(e.target.value)}
                        required
                    />
                    <Field
                        className={styles.field}
                        label={t("overviewCategory.enteramount")}
                        placeholder={t("overviewCategory.typeamount")}
                        value={value.in}
                        onChange={(e: any) => setValue({ ...value, in: e.target.value })}
                        required
                        type="number"
                        min={0}
                    />
                    {user?.clientIdVerified === false ? (
                        <button
                            className={cn("button-wide", styles.button)}
                            style={{
                                backgroundColor: "red",
                                cursor: "not-allowed",
                                opacity: "70%",
                            }}
                        disabled
                        >
                            {loading ? t("overviewCategory.loading") + "..." : t("notificationPage.disabled")}
                        </button>
                    ) : (
                        <button className={cn("button-wide", styles.button)} onClick={newCharge}>
                            {loading ? (
                                t("overviewCategory.loading") + "..."
                            ) : (
                                <>
                                    <span style={{ marginLeft: "5px" }}>{t("overviewCategory.buycrypto")}</span>
                                </>
                            )}
                        </button>
                    )}
                </>
            </Modal>
        </>
    );
};

export default Fiat;
