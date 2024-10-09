import { Context } from "@/components/Context/Context";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import styles from "./AdminPage.module.sass";
import Pagination from "@/components/Pagination";
import Icon from "@/components/Icon";
import Transaction from "./Transaction";
import getDeposit from "pages/api/getDepositRequest";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";
import NavigationAdmin from "@/components/NavigationAdmin";

const AdminPage = () => {
    const { t } = useTranslation();
    const breadcrumbs = [
        {
            title: t("dashboardPage.dashboard"),
            url: "/dashboard",
        },
        {
            title: t("dashboardPage.admin"),
        },
    ];
    const { user } = useContext(Context);
    const { admin } = useLanguageConstants();
    const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
    const [depositRequest, setDepositRequest] = useState<any>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleChange = (filter: any) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((x: any) => x !== filter));
        } else {
            setSelectedFilters((selectedFilters: any) => [...selectedFilters, filter]);
        }
    };

    const itemsPerPage = 10; // Number of transactions per page

    const totalPages = Math.ceil(depositRequest.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getPaginatedTransactions = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return depositRequest.slice(startIndex, endIndex);
    };

    const getDepositReq = async () => {
        try {
            const deposit = await getDeposit();
            setDepositRequest(deposit);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getDepositReq();
    }, []);

    return (
        <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs} head={<NavigationAdmin />}>
            <div className={styles.transaction}>
                <div className={styles.inner}>
                    <div className={styles.table}>
                        <div className={styles.head} style={{ display: "flex", justifyContent: "center" }}>
                            {admin.map((caption) => (
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
                            {getPaginatedTransactions().map((transaction: any) => (
                                <Transaction
                                    getDepositReq={getDepositReq}
                                    value={selectedFilters?.includes(transaction?.id)}
                                    onChange={() => handleChange(transaction?.id)}
                                    item={transaction}
                                    key={transaction?.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </Layout>
    );
};

export default AdminPage;
