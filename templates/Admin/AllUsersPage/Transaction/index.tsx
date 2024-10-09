import cn from "classnames";
import styles from "./Transaction.module.sass";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Select from "@/components/Select";
import { useState } from "react";

type TransactionType = {
    displayName: string;
    email: string;
    userName: string;
    userTypes: string;
    clientIdVerified: boolean;
    freezeType: boolean;
    id: any;
    tier: string;
};

type TransactionProps = {
    item: TransactionType;
    value: any;
    onChange: any;
    getAllUsers: any;
};

type OptionType = {
    title: string;
    value: string;
    percent: string;
};

const cards = [
    {
        tier: "1",
        percent: "3.5",
    },
    {
        tier: "2",
        percent: "3.0",
    },
    {
        tier: "3",
        percent: "2.5",
    },
    {
        tier: "4",
        percent: "2.0",
    },
    {
        tier: "5",
        percent: "1.5",
    },
    {
        tier: "6",
        percent: "1.2",
    },
    {
        tier: "7",
        percent: "0.9",
    },
    {
        tier: "8",
        percent: "0.7",
    },
    {
        tier: "9",
        percent: "0.6",
    },
];

const Transaction = ({ item, getAllUsers }: TransactionProps) => {
    const { t } = useTranslation();
    const cardOptions: OptionType[] = cards.map((card) => ({
        title: `${t("adminPage.tier")} ${card.tier} - ${card.percent}`,
        value: card.tier,
        percent: card.percent,
    }));
    const [card, setCard] = useState<string>(cardOptions[0].value);
    const updateStatus = async (freezeType: boolean) => {
        await updateDoc(doc(db, "chainCash", item?.id), { freezeType });
        await getAllUsers();
    };

    const updateTier = async (tier: string) => {
        try {
            await updateDoc(doc(db, "chainCash", item?.id), { tier });
            await getAllUsers();
        } catch (error) {
            console.log(error);
        }
    };

    // const handleChange = (value: string) => {
    //     setCard(value);
    //     updateTier(value);
    // };

    const handleChange = (selectedValue: string) => {
        // Find the corresponding card option
        const selectedOption = cardOptions.find((option) => option.value === selectedValue);
        if (selectedOption) {
            // Extract the title and update tier
            const { percent } = selectedOption;
            setCard(selectedValue);
            updateTier(percent);
        }
    };

    return (
        <>
            <div className={cn(styles.transaction, { [styles.active]: false })}>
                <div className={styles.head}>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div className={styles.name}>{item?.displayName}</div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div className={styles.name}>{item?.email}</div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div className={styles.name}>{item?.userName}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.name}>{t(`adminPage.${item?.userTypes.toLowerCase()}`)}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.name}>
                            {item?.clientIdVerified === true ? t("adminPage.verified") : t("adminPage.notverified")}
                        </div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div
                            className={cn(
                                {
                                    [styles.success]: item?.freezeType === false,
                                    [styles.canceled]: item?.freezeType === true,
                                },
                                styles.status
                            )}
                        >
                            {item?.freezeType === true ? t("adminPage.freeze") : t("adminPage.unfreeze")}
                        </div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            onClick={() => updateStatus(true)}
                            style={{
                                marginLeft: "8px",
                                fontWeight: "bold",
                                color: "#FF0000",
                                border: "1px solid",
                                borderRadius: "5px",
                                padding: "8px",
                            }}
                        >
                            {t("adminPage.freeze")}
                        </button>
                        <button
                            onClick={() => updateStatus(false)}
                            style={{
                                marginLeft: "8px",
                                fontWeight: "bold",
                                backgroundColor: "#23978D",
                                color: "white",
                                border: "1px solid",
                                borderRadius: "5px",
                                padding: "8px",
                            }}
                        >
                            {t("adminPage.unfreeze")}
                        </button>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.name}>{`${t("adminPage.tier")} ${item?.tier}%`}</div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", marginLeft: "10px" }}
                    >
                        <Select className={styles.field} value={card} onChange={handleChange} options={cardOptions} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transaction;
