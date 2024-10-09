import Image from "@/components/Image";
import cn from "classnames";
import styles from "./Transaction.module.sass";
import { useContext } from "react";
import { Context } from "@/components/Context/Context";

type TransactionType = {
    name: string;
    image: string;
    currency: string;
    rate: string;
    symbol: string;
    current_price: number;
};

type TransactionProps = {
    item: TransactionType;
    value: any;
    onChange: any;
};

const Transaction = ({ item }: TransactionProps) => {
    const { user } = useContext(Context);
    const userTier = user?.tier

    return (
        <>
            <div className={cn(styles.transaction, { [styles.active]: false })}>
                <div className={styles.head} style={{ justifyContent: "space-between" }}>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.name}>
                            <Image
                                width={34}
                                height={34}
                                alt=""
                                className="rounded-full"
                                src={item.currency ? `https://flagsapi.com/${item.currency?.slice(0, 2)}/flat/64.png` : item?.image}
                            />
                        </div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.name}>{item?.name}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.name}>{item?.currency || item?.symbol.toUpperCase()}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>{item?.rate || (item?.current_price + (item?.current_price) * Number(userTier) / 100).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transaction;
