import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import cn from "classnames";
import "core-js/stable";
import { useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../Context/Context";
import styles from "./Fiat.module.sass";
import Image from "next/image";
import ConfirmModal from "./ConfirmModal";
import { useTranslation } from "react-i18next";
import getUser from "pages/api/getUser";

const cards = [
    {
        title: "USDC",
        value: "USDC",
    },
    {
        title: "USDT",
        value: "USDT",
    },
];

type BuyProps = {
    className?: string;
};

const Buy = ({ className }: BuyProps) => {
    const {
        t,
        i18n: { language },
    } = useTranslation();
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [card, setCard] = useState<string>(cards[0].value);
    const [ammount, setAmmount] = useState<string>("");
    const [receiver, setReceiver] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmModal, setConfirmModal] = useState<any>(false);
    const { user } = useContext(Context);
    const accountInfo = useMemo(() => {
        return {
            ispb: "13140088",
            name: t("overviewCategory.accessPaymentSolutionsS"),
            agency: "0001",
            number: "332",
            currentAccount: "2561867-0",
            taxpayer: "",
            pixkey: "9cb0f71f-3f22-44dd-9fe8-6737f8d56d48",
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t, language]);
    // const [accountInfo, setAccountInfo] = useState({
    //   ispb: "13140088",
    //   name: "NEXTECH",
    //   branch: "0001",
    //   account: "2561867-0",
    //   taxpayer: "401 Agency: 0001",
    //   pixkey: "9cb0f71f-3f22-44dd-9fe8-6737f8d56d48",
    // });

    const handleChange = (value: string) => setCard(value);

    const onSubmit = async () => {
        try {
            setLoading(true);
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
            if (!user?.wallet?.address) {
                toast.error(t("overviewCategory.recieveraddressdesc"));
                setLoading(false);
                return;
            }
            if (!ammount) {
                toast.error(t("words.pleaseprovide"));
                setLoading(false);
                return;
            }

            setConfirmModal({
                coin: card,
                request: user?.wallet?.address || receiver,
                amount: ammount,
                dueDate: new Date()?.toLocaleString() || "",
                status: "Pending",
                userid: user.id,
            });
        } catch (err: any) {
            console.log(err);
            toast.error(t("overviewCategory.fielderror"));
            setLoading(false);
        }
    };

    return (
        <>
            <button className={cn("button", className)} onClick={() => setVisibleModal(true)}>
                <Icon name="transfer" />
                <span>{t("overviewCategory.buy")}</span>
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
                    <div className={styles.title}>{t("overviewCategory.buycrypto")}</div>
                    <div className={styles.info}>{t("words.userinformation")}</div>
                    <div style={{ marginBottom: "10px" }}>
                        <p style={{ fontWeight: "bold" }}>{t("overviewCategory.bankdetails")}</p>
                        <p style={{ fontWeight: "bold" }}>
                            {t("overviewCategory.bankname")}: {accountInfo.name}
                        </p>
                        <p style={{ fontWeight: "bold" }}>
                            {t("overviewCategory.agency")}: {accountInfo.agency}
                        </p>
                        {/* <p style={{ fontWeight: "bold" }}>
                            {t("overviewCategory.number")}: {accountInfo.number}
                        </p> */}
                        <p style={{ fontWeight: "bold" }}>
                            {t("overviewCategory.currentAccount")}: {accountInfo.currentAccount}
                        </p>
                        <p style={{ fontWeight: "bold" }}>
                            {t("overviewCategory.pIXkey")}: {accountInfo.pixkey}
                        </p>
                    </div>
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
                        value={user?.wallet?.address}
                        onChange={(e: any) => setReceiver(e.target.value)}
                        required
                    />
                    <Field
                        className={styles.field}
                        label={t("overviewCategory.enteramount")}
                        placeholder={t("overviewCategory.typeamount")}
                        value={ammount}
                        onChange={(e: any) => setAmmount(e.target.value)}
                        required
                        type="number"
                        min={1000}
                    />
                    {/* {user?.clientIdVerified === false ? ( */}
                    <button
                        className={cn("button-wide", styles.button)}
                        style={{
                            backgroundColor: "red",
                            cursor: "not-allowed",
                            opacity: "70%",
                        }}
                        // disabled
                        onClick={onSubmit}
                    >
                        {loading ? t("overviewCategory.loading") + "..." : t("notificationPage.disabled")}
                    </button>
                    {/* // ) : (
                    //     <button className={cn("button-wide", styles.button)} onClick={onSubmit}>
                    //         {loading ? (
                    //             t("overviewCategory.loading") + "..."
                    //         ) : (
                    //             <span>{t("overviewCategory.request")}</span>
                    //         )}
                    //     </button>
                    // )} */}
                </>

                <ConfirmModal
                    closeModal={(success?: boolean) => {
                        setLoading(false);
                        if (success) {
                            setVisibleModal(false);
                            setConfirmModal(false);
                        }
                    }}
                    accountInfo={accountInfo}
                    visibleModal={confirmModal}
                />
            </Modal>
        </>
    );
};

export default Buy;
