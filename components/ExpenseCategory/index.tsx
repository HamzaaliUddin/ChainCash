import Card from "@/components/Card";
import axios from "axios";
import cn from "classnames";
import { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import styles from "./ExpenseCategory.module.sass";
import { useTranslation } from "react-i18next";

type ExpenseCategoryType = {
    name: string;
    value: number;
    color: string;
};

type ExpenseCategoryProps = {
    items: ExpenseCategoryType[];
    column?: boolean;
};

const ExpenseCategory = ({ items, column }: ExpenseCategoryProps) => {
    const { user, assetsBalance, setAssetsBalance, setPriceUSD } = useContext(Context);
    const { t } = useTranslation();

    const assetBal = async () => {
        try {
            await axios
                .get(`${process.env.NEXT_PUBLIC_URL}/getVaultAccountsWithPageInfo`)
                .then((res) => res.data)
                .then(async (data) => {
                    setAssetsBalance(
                        data?.accounts?.filter((i: any) => i.id === `${user?.vaultAccount?.id}`)[0]?.assets
                    );
                    const assetIds = data?.accounts?.filter((i: any) => i.id === `${user?.vaultAccount?.id}`)[0]
                        ?.assets;
                    const updatedCrypto = [];
                    for (const element of assetIds) {
                        const assetId = element;

                        const response = await fetch(
                            `https://api.dexscreener.com/latest/dex/search/?q=${assetId.id?.split("_")[0]}`
                        );
                        if (!response.ok) {
                            throw new Error(`Failed to fetch data for ${assetId.id}`);
                        }

                        const responseData = await response.json();
                        // Assuming the data structure contains the price
                        updatedCrypto.push({
                            ...assetId,
                            priceUSD: responseData.pairs[0].priceUsd,
                        });
                        setPriceUSD(responseData.pairs);
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        assetBal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card title={t("overviewCategory.walletfundssec")} tooltip="">
            <div className={cn(styles.row, { [styles.rowColumn]: column })}>
                <div>
                    {assetsBalance?.map((item: any) => (
                        <div className={styles.item} key={item.id} style={{ display: "flex", gap: "16px" }}>
                            <div className={styles.title}>{item.id ? item?.id?.split("_")[0] : "Tokens"}</div>
                            <div className={styles.value}>{Number(item.total)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default ExpenseCategory;
