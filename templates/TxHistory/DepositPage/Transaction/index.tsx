import cn from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./Transaction.module.sass";

type TransactionType = {
    typeTransaction: string;
    date: string;
    time: string;
    amount: string;
    status: string;
    account_id: string;
    assetId: string;
    receiver_name: string;
    sender_name: string;
    createdAt: string;
    created_at: string;
    length: any
};

type TransactionProps = {
    item: TransactionType;
    value: any;
    onChange: any;
};

const Transaction = ({ item }: TransactionProps) => {
    const { t } = useTranslation();
    return (
        <>
            <div className={cn(styles.transaction, { [styles.active]: false })}>
                <div className={styles.head}>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div
                            className={styles.name}

                        >
                            {item?.account_id

                                ? `${item?.account_id
                                    ?.slice(0, 6)}...${item?.account_id
                                        ?.slice(
                                            item?.account_id
                                                ?.length - 6,
                                            item?.account_id
                                                ?.length
                                        )}`
                                : "null"}
                        </div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div
                            className={styles.name}

                        >
                            {/* {item?.destinationAddress
                                ? `${item?.destinationAddress?.slice(0, 6)}...${item?.destinationAddress?.slice(
                                    item?.destinationAddress?.length - 6,
                                    item?.destinationAddress?.length
                                )}`
                                : "null"} */}
                            {item.receiver_name
                                ? item?.receiver_name

                                : "null"}
                        </div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div
                            className={styles.name}

                        >
                            {/* {item?.sourceAddress
                                ? `${item?.sourceAddress?.slice(0, 6)}...${item?.sourceAddress?.slice(
                                    item?.sourceAddress?.length - 6,
                                    item?.sourceAddress?.length
                                )}`
                                : "null"} */}
                            {item?.sender_name
                            }
                        </div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>{item?.created_at}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>{item.amount}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div
                            className={cn(
                                {
                                    [styles.success]: item?.status === "Success",
                                    [styles.pending]: item?.status === "Pending",
                                    [styles.canceled]: item?.status === "Canceled",
                                },
                                styles.status
                            )}
                        >
                            {/* {t(`adminPage.${item.status.toLowerCase()}`)} */}
                            {item.status}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transaction;
