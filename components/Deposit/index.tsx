import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import cn from "classnames";
import "core-js/stable";
import addDepositRequest from "pages/api/addDepositRequest";
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
        value: "MATIC_POLYGON",
    },
    {
        title: "BNB",
        value: "BNB_TEST",
    },
];

type DepositProps = {
    className?: string;
};

const Deposit = ({ className }: DepositProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [card, setCard] = useState<string>(cards[4].value);
    const [ammount, setAmmount] = useState<string>("");
    const [receiver, setReceiver] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useContext(Context);
    const { t } = useTranslation();
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
            await addDepositRequest({
                coin: card,
                request: user?.wallet?.address || receiver,
                amount: ammount,
                dueDate: new Date()?.toLocaleString() || "",
                status: "Pending",
                userid: user.id,
            });
            toast.success(t("overviewCategory.requestsent"));
            setLoading(false);
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
                <span>{t("overviewCategory.deposit")}</span>
            </button>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => {
                    setVisibleModal(false);
                }}
            >
                <div className={styles.title}>{t("overviewCategory.depositcrypto")}</div>
                <div className={styles.info}>{t("words.userinformation")}</div>
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
                    <button className={cn("button-wide", styles.button)} onClick={onSubmit}>
                        {loading ? t("overviewCategory.loading") + "..." : <span>{t("overviewCategory.request")}</span>}
                    </button>
                )}
            </Modal>
        </>
    );
};

export default Deposit;
