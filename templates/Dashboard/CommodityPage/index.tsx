import { Context } from "@/components/Context/Context";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import AddCommodity from "./AddCommodity";
import BuyCommodity from "./BuyCommodity";
import CancelCommodity from "./CancelCommodity";
import CheckCommodity from "./CheckCommodity";
import CommodityCounter from "./CommodityCounter";
import styles from "./CommodityPage.module.sass";
import Commodities from "./Transaction";

function CommodityPage() {
    const { allcommodity, user } = useContext(Context);
    const { commodityCaptions } = useLanguageConstants();
    const { t } = useTranslation();
    const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
    const breadcrumbs = [
        {
            title: t("dashboardPage.dashboard"),
            url: "/dashboard",
        },
        {
            title: t("dashboardPageCategories.commodity"),
        },
    ];
    const [loading, setLoading] = useState<boolean | number>(false);
    const [comodityIdData, setComodityIdData] = useState<any>([]);
    const handleChange = (filter: any) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((x: any) => x !== filter));
        } else {
            setSelectedFilters((selectedFilters: any) => [...selectedFilters, filter]);
        }
    };
    return (
        <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs} head={<Navigation />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px",overflow:'hidden' }}>
                <div className={styles.transaction}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <AddCommodity
                            loading={loading}
                            setLoading={setLoading}
                            comodityIdData={comodityIdData}
                            setComodityIdData={setComodityIdData}
                        />
                        {/* <CancelCommodity loading={loading} setLoading={setLoading} /> */}
                        {/* <BuyCommodity loading={loading} setLoading={setLoading} /> */}
                        {/* <CheckCommodity
                            loading={loading}
                            setLoading={setLoading}
                            comodityIdData={comodityIdData}
                            setComodityIdData={setComodityIdData}
                        />
                        <CommodityCounter /> */}
                    </div>
                </div>
                <div className={styles.transaction}>
                    <div className={styles.inner}>
                        <div className={styles.table} >
                            <div className={styles.head} >
                                {commodityCaptions.map((caption) => (
                                    <div
                                        className={styles.cell}
                                        key={caption.id}
                                        style={{ display: "flex", justifyContent: "center" }}
                                    >
                                        {caption.title}
                                        {caption.sorting && (
                                            <button className={styles.sorting}>
                                                <Icon name="arrow-swap" size="18" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.body}>
                                {allcommodity.map((transaction: any) => (
                                    <Commodities
                                        value={selectedFilters.includes(transaction.id)}
                                        onChange={() => handleChange(transaction.id)}
                                        item={transaction}
                                        key={transaction.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CommodityPage;
