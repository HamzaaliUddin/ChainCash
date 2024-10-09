import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import axios from "axios";
import cn from "classnames";
import getUsers from "pages/api/getUsers";
import updateUser from "pages/api/updateUser";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contacts from "../Contacts";
import { Context } from "../Context/Context";
import styles from "./Transfer.module.sass";
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
        value: "MATIC_POLYGON",
    },
    {
        title: "BNB",
        value: "BNB_BSC",
    },
];

type TransferProps = {
    className?: string;
};

const Transfer = ({ className }: TransferProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [card, setCard] = useState<string>(cards[4].value);
    const [ammount, setAmmount] = useState<string>("");
    const [iuguAmmount, setIuguAmmount] = useState<string>("");
    const [receiver, setReceiver] = useState<string>("");
    const [iuguReceiver, setIuguReceiver] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const [vaultAccount, setVaultAccount] = useState<any>([]);
    const [allUser, setAllUser] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user, userIp } = useContext(Context);
    const { t } = useTranslation();

    const [assetType, setAsssetType] = useState<any>("Crypto");

    const handleChange = (value: string) => setCard(value);

    const transferEmail = async (to: string, card: string, sender: string, receiver: string, amount: string) => {
        try {
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/transferEmail`, {
                    to,
                    card,
                    sender,
                    receiver,
                    amount,
                })
                .then((res) => res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getVaultAccountsWithPageInfo = async () => {
        try {
            await axios
                .get(`${process.env.NEXT_PUBLIC_URL}/getVaultAccountsWithPageInfo`)
                .then((res) => res.data)
                .then((data) => setVaultAccount(data?.accounts));
        } catch (err) {
            console.error(err);
        }
    };

    const getAllUsers = async () => {
        try {
            const users = await getUsers();
            setAllUser(users);
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            console.log(user);
            if (user?.clientIdVerified === false) {
                toast.error("Please complete your Kyc");
                setLoading(false);
                return;
            }
            if (user?.freezeType) {
                toast.error(t("overviewCategory.youraccountisfreeze"));
                setLoading(false);
                return;
            }
            if (!receiver) {
                toast.error(t("overviewCategory.recieveraddressdesc"));
                setLoading(false);
                return;
            }
            if (!ammount) {
                toast.error(t("words.pleaseprovide"));
                setLoading(false);
                return;
            }
            if (!receiver) {
                toast.error("Please enter a valid address");
                setLoading(false);
                return;
            }

            const fee = Number(ammount) * 0.02; // Calculate the 2% fee
            const amountAfterFee = Number(ammount) - fee;

            const currentUser = allUser.filter((i: any) => i?.wallet?.address === receiver)[0];
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/createTransaction`, {
                    assetId: card,
                    amount: amountAfterFee.toString(),
                    srcId: user?.vaultAccount?.id,
                    address: receiver,
                    note: "Transaction Successfully Sent!",
                })
                .then((res) => res?.data);
            // await axios.post(`${process.env.NEXT_PUBLIC_URL}/createTransaction`, {
            //     assetId: card,
            //     amount: fee.toString(),
            //     srcId: user?.vaultAccount?.id,
            //     address: "0x4DA21707a86F29033F26c0adBd70E9D105299467",
            //     note: "fees",
            // });
            getVaultAccountsWithPageInfo();
            updateUser(currentUser?.id, {
                vaultAccount: vaultAccount?.filter((i: any) => i.id === currentUser?.vaultAccount?.id)[0],
            });
            toast.success(t("notificationPage.transactionsuccess"));
            transferEmail(user?.email, card, user?.wallet?.address, receiver, ammount);
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            toast.error(t("overviewCategory.fielderror"));
            setLoading(false);
        }
    };

    const iuguTransfer = async () => {
        try {
            const response = await fetch("/api/createIuguTransfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ iuguReceiver, iuguAmmount, user }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            // await updateDoc(doc(db, "chainCash", user?.id), {
            //     clientIdVerified: true,
            //     iuguSubaccount: data.iuguSubAccount,
            // });
            // router.push("/dashboard");
            // toast.success(t("dashboardPage.subAccount"));
            toast.success(t("notificationPage.transactionsuccess"));
        } catch (error: any) {
            toast.error(error.message);
            console.error("Error creating sub-account:", error);
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

    useEffect(() => {
        getAllUsers();
        getVaultAccountsWithPageInfo();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <button className={cn("button", className)} onClick={() => setVisibleModal(true)}>
                <Icon name="transfer" />
                <span>{t("overviewCategory.transfer")}</span>
            </button>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <div className={styles.title}>{t("overviewCategory.sendMoney")}</div>
                <div className={styles.info}>{t("words.userinfodesc")}</div>
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
                <Contacts
                    className={styles.contacts}
                    items={allUser}
                    setReceiver={setReceiver}
                    setIuguReceiver={setIuguReceiver}
                    slidesPerViewTablet={3}
                    slidesPerViewDesktop={3}
                    searchShow
                />
                {(userIp && userIp.country_code === "BR") &&
                    <div style={{ display: "flex", justifyContent: "space-around", gap: "10px", marginBottom: "10px" }}>
                        <button
                            onClick={() => setAsssetType("Crypto")}
                            style={{
                                color: `${assetType === "Crypto" ? "white" : "black"}`,
                                backgroundColor: `${assetType === "Crypto" ? "#23978D" : " transparent"}`,
                                width: "100%",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                borderRadius: "10px",
                            }}
                        >
                            Crypto
                        </button>
                        <button
                            onClick={() => setAsssetType("Iugu")}
                            style={{
                                color: `${assetType === "Iugu" ? "white" : "black"}`,
                                backgroundColor: `${assetType === "Iugu" ? "#23978D" : " transparent"}`,
                                width: "100%",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                borderRadius: "10px",
                            }}
                        >
                            Fiat
                        </button>
                    </div>
                }
                {assetType === "Crypto" ? (
                    <>
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
                            label={t("overviewCategory.senderAddress")}
                            placeholder={t("overviewCategory.senderAddress")}
                            value={user?.wallet?.address || sender}
                            onChange={(e: any) => setSender(e.target.value)}
                            disabled
                            required
                        />
                        <Field
                            className={styles.field}
                            label={t("overviewCategory.recieveraddress")}
                            placeholder={t("overviewCategory.recieveraddress")}
                            value={receiver}
                            onChange={(e: any) => setReceiver(e.target.value)}
                            required
                        />
                        <Field
                            className={styles.field}
                            label={t("overviewCategory.enteramount")}
                            placeholder={t("overviewCategory.typeamount")}
                            // iconBefore="dollar-circle"
                            value={ammount}
                            onChange={(e: any) => setAmmount(e.target.value)}
                            required
                            type="number"
                            min={0}
                        />
                    </>
                ) : (
                    <>
                        <Field
                            className={styles.field}
                            label={"Receiver ID"}
                            placeholder={"Receiver ID"}
                            value={iuguReceiver}
                            onChange={(e: any) => setIuguReceiver(e.target.value)}
                            required
                        />
                        <Field
                            className={styles.field}
                            label={t("overviewCategory.enteramount")}
                            placeholder={t("overviewCategory.typeamount")}
                            // iconBefore="dollar-circle"
                            value={iuguAmmount}
                            onChange={(e: any) => setIuguAmmount(e.target.value)}
                            required
                            type="number"
                            min={0}
                        />
                    </>
                )}
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
                    <button
                        className={cn("button-wide", styles.button)}
                        onClick={assetType !== "Crypto" ? iuguTransfer : onSubmit}
                    >
                        {loading ? t("overviewCategory.loading") + "..." : t("overviewCategory.confirm")}
                    </button>
                )}
            </Modal>
        </>
    );
};

export default Transfer;
