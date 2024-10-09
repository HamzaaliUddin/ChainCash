import Currency from "@/components/Currency";
import ExpenseAnalysis from "@/components/ExpenseAnalysis";
import ExpenseCategory from "@/components/ExpenseCategory";
import IncomeAnalysis from "@/components/IncomeAnalysis";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import PocketPlans from "@/components/PocketPlans";
import RecentActivity from "@/components/RecentActivity";
import TotalBalance from "@/components/TotalBalance";
import styles from "./DashboardV1Page.module.sass";

import { Context } from "@/components/Context/Context";
import { activity } from "@/mocks/activity";
import { currency } from "@/mocks/currency";
import { expenseCategory } from "@/mocks/expenseCategory";
import { plans } from "@/mocks/plans";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import axios from "axios";
import { ethers } from "ethers";
import Moralis from "moralis";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type DashboardPageProps = {};

const DashboardPage = ({ }: DashboardPageProps) => {
    const { user } = useContext(Context);
    const [gettxData, settxData] = useState<any[]>([]);
    const { t } = useTranslation();

    const inCome = gettxData.filter((tx) => tx.to_address === user?.wallet?.address);
    const outCome = gettxData.filter((tx) => tx.from_address === user?.wallet?.address);
    const totalIncome = inCome.reduce((acc, income) => acc + parseFloat(income.value), 0);
    const totalOutCome = outCome.reduce((acc, outcome) => acc + parseFloat(outcome.value), 0);

    const breadcrumbs = [
        {
            title: t("dashboardPage.dashboard"),
            url: "/dashboard",
        },
        {
            title: t("dashboardPageCategories.overview"),
        },
    ];
    const getSupportedAssets = async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_URL}/getSupportedAssets`).then((res) => console.log(res.data));
        } catch (error) {
            console.log(error);
        }
    };

    const getHistory = async () => {
        try {
            if (!Moralis.Core.isStarted) {
                await Moralis.start({
                    apiKey: process.env.NEXT_PUBLIC_moralis_API,
                    // ...and any other configuration
                });
            }

            const chain = EvmChain.POLYGON;
            const response = await Moralis.EvmApi.transaction.getWalletTransactions({
                address: user?.wallet?.address,
                chain,
            });
            settxData(response.toJSON().result.map((a) => ({ ...a, value: ethers.utils.formatEther(a.value) })));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSupportedAssets();
        getHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs} head={<Navigation />}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <TotalBalance />
                    <PocketPlans items={plans} more />
                </div>
                <div className={styles.col}>
                    <ExpenseCategory items={expenseCategory} />
                    <div className={styles.line}>
                        <div className={styles.cell}>
                            <IncomeAnalysis
                                totalIncome={totalIncome}
                                items={inCome.map((tx) => ({
                                    name: new Date(tx.block_timestamp || "").toLocaleDateString(),
                                    value: tx.value,
                                }))}
                            />
                        </div>
                        <div className={styles.cell}>
                            <ExpenseAnalysis
                                totalOutCome={totalOutCome}
                                items={outCome.map((tx) => ({
                                    name: new Date(tx.block_timestamp || "").toLocaleDateString(),
                                    value: tx.value,
                                }))}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.card}>
                        <RecentActivity viewItems={4} items={activity} />
                    </div>
                    <div className={styles.card}>
                        <Currency items={currency} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
