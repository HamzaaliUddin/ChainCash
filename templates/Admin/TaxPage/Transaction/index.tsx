import cn from "classnames";
import styles from "./Transaction.module.sass";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

type TransactionType = {
    displayName: string;
    email: string;
    userName: string;
    userTypes: string;
    clientIdVerified: boolean;
    freezeType: boolean;
    id: any;
};

type TransactionProps = {
    item: TransactionType;
    value: any;
    onChange: any;
    getAllUsers: any;
};

const Transaction = ({ item, getAllUsers }: TransactionProps) => {
    const { t } = useTranslation();
    const updateStatus = async (freezeType: boolean) => {
        await updateDoc(doc(db, "chainCash", item?.id), { freezeType });
        await getAllUsers();
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
                        <div className={styles.status}>{t(`adminPage.${item?.userTypes.toLowerCase()}`)}</div>
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
                </div>
            </div>
        </>
    );
};

export default Transaction;
