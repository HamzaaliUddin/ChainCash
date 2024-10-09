import cn from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./Transaction.module.sass";

type TransactionType = {
    typeTransaction: string;
    date: string;
    time: string;
    amount: string;
    status: string;
    txHash: string;
    assetId: string;
    destinationAddress: string;
    sourceAddress: string;
    createdAt: string;
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
                            onClick={() =>
                                window.open(
                                    `${item.assetId === "MATIC_POLYGON"
                                        ? "https://polygonscan.com" :
                                        item.assetId === "USDC_POLYGON" ? "https://polygonscan.com" :
                                            item.assetId === "USDT_POLYGON" ? "https://polygonscan.com"
                                                : item.assetId === "ETH_TEST3"
                                                    ? "https://goerli.etherscan.io"
                                                    : "#"
                                    }/tx/${item?.txHash}`
                                )
                            }
                        >{`${item?.txHash?.slice(0, 6)}...${item?.txHash?.slice(
                            item?.txHash?.length - 6,
                            item?.txHash?.length
                        )}`}</div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div
                            className={styles.name}
                            onClick={() =>
                                window?.open(
                                    `${item?.assetId === "MATIC_POLYGON"
                                        ? "https://polygonscan.com" :
                                        item?.assetId === "USDC_POLYGON" ? "https://polygonscan.com" :
                                            item?.assetId === "USDT_POLYGON" ? "https://polygonscan.com"
                                                : item?.assetId === "ETH_TEST3"
                                                    ? "https://goerli.etherscan.io"
                                                    : "#"
                                    }/address/${item?.destinationAddress}`
                                )
                            }
                        >
                            {`${item?.destinationAddress?.slice(0, 6)}...${item?.destinationAddress?.slice(
                                item?.destinationAddress?.length - 6,
                                item?.destinationAddress?.length
                            )}`}
                        </div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div
                            className={styles.name}
                            onClick={() =>
                                window.open(
                                    `${item.assetId === "MATIC_POLYGON"
                                        ? "https://polygonscan.com" :
                                        item.assetId === "USDC_POLYGON" ? "https://polygonscan.com" :
                                            item.assetId === "USDT_POLYGON" ? "https://polygonscan.com"
                                                : item.assetId === "ETH_TEST3"
                                                    ? "https://goerli.etherscan.io"
                                                    : "#"
                                    }/address/${item?.sourceAddress}`
                                )
                            }
                        >{`${item?.sourceAddress?.slice(0, 6)}...${item?.sourceAddress?.slice(
                            item?.sourceAddress?.length - 6,
                            item?.sourceAddress?.length
                        )}`}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>{`${new Date(item?.createdAt || "")?.getDate()}/${new Date(
                            item?.createdAt || ""
                        ).getDay()}/${new Date(item?.createdAt || "").getFullYear()}  ${new Date(
                            item?.createdAt || ""
                        ).getHours()}:${new Date(item?.createdAt || "").getMinutes()}`}</div>
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
                            {t(`adminPage.${item.status.toLowerCase()}`)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transaction;
