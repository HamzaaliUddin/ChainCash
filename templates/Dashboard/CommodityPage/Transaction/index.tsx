import cn from "classnames";
import { ethers } from "ethers";
import styles from "./Transaction.module.sass";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "@/components/Context/Context";
import { toast } from "react-toastify";
import Link from "next/link";

type CommoditiesType = {
    commodityId: string;
    commodityName: any;
    commodityPrice: any;
    hex: string;
    buyer: string;
    seller: string;
    status: any;
    dueDate: any;
    transactionHash: any;
};

type CommoditiesProps = {
    item: CommoditiesType;
    value: any;
    onChange: any;
};

const Commodities = ({ item }: CommoditiesProps) => {
    const { user } = useContext(Context);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const cancelComodity = async (commodityId: string) => {
        try {
            setLoading(true);
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/cancelComodity`, {
                    commodityId: commodityId,
                    vaultAccountId: Number(user.wallet.id),
                })
                .then((res) => res.data);
            setLoading(false);
            toast("Commodity Canceled");
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            toast.error(err);
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
                        {/* <Checkbox className={styles.checkbox} value={value} onChange={onChange} /> */}
                        <div className={styles.name}>{item?.commodityId}</div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div className={styles.name}>
                            {(item?.commodityName === "0" && t("commodityCategory.rice")) ||
                                (item?.commodityName === "1" && t("commodityCategory.sugar")) ||
                                (item?.commodityName === "2" && t("commodityCategory.corn"))}
                        </div>
                    </div>
                    <div
                        className={styles.cell}
                        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                    >
                        <div className={styles.name}>
                            {item?.commodityPrice?.hex
                                ? ethers?.utils?.formatEther(item?.commodityPrice?.hex?.toLocaleString())
                                : item?.commodityPrice}
                        </div>
                    </div>

                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>{`${item?.buyer?.slice(0, 8)}...${item?.buyer?.slice(
                            item?.buyer?.length - 6,
                            item?.buyer?.length
                        )}`}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>{`${item?.seller?.slice(0, 8)}...${item?.seller?.slice(
                            item?.seller?.length - 6,
                            item?.seller?.length
                        )}`}</div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={cn(styles.status)}>
                            {(item?.status === 0 && t("adminPage.open")) ||
                                (item?.status === 1 && t("adminPage.completed")) ||
                                (item?.status === 2 && t("adminPage.canceled")) ||
                                (item?.status === 3 && t("words.disputed")) ||
                                (item?.status === 4 && t("words.resolved")) ||
                                (item?.status === 5 && t("words.autoresolved"))}
                        </div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>
                            {/* {new Date(Number(parseInt(item?.dueDate?.hex, 16).toString()) || "").getDay()} */}
                            {item?.dueDate ? item.dueDate.toString() : "0"}
                        </div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>
                            <button
                                style={{ marginBlock: "7px" }}
                                className={cn("button-small", styles.button)}
                                onClick={() => cancelComodity(item?.commodityId)}
                                disabled={loading}
                            >
                                {t("commodityCategory.cancel")}
                            </button>
                        </div>
                    </div>
                    <div className={styles.cell} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.status}>
                            <Link
                                href={`https://polygonscan.com/tx/${item?.transactionHash}`}
                                style={{ marginBlock: "7px" }}
                                className={cn("button-small", styles.button)}
                                target="_blank"
                            >
                                {t("commodityCategory.viewContract")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Commodities;
