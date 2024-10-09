import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import styles from "./DepositTransactionPage.module.sass";
import Transaction from "./Transaction";

import { Context } from "@/components/Context/Context";
import NavigationTx from "@/components/NavigationTx";
import Pagination from "@/components/Pagination";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";

const DepositPage = () => {
  const { depositCaptions } = useLanguageConstants();
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("dashboardPage.txHistory"),
      url: "/txhistory",
    },
    {
      title: t('tXHistoryPage.deposithistory'),
    },
  ];
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);

  const { txdata, user } = useContext(Context);

  const [depositList, setDepositList] = useState<any>([])
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (filter: any) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((x: any) => x !== filter));
    } else {
      setSelectedFilters((selectedFilters: any) => [
        ...selectedFilters,
        filter,
      ]);
    }
  };

  const itemsPerPage = 10; // Number of transactions per page

  const totalPages = Math.ceil(depositList.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedTransactions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return depositList.slice(startIndex, endIndex);
  };

  const getDepositList = async () => {
    try {
      const response = await fetch("/api/getIuguDepositList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ apiKey: user?.iuguSubaccount?.live_api_token }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDepositList(data.iuguDepositList.items)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDepositList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout
      title={`${user?.displayName} 👏🏻`}
      breadcrumbs={breadcrumbs}
      head={<NavigationTx />}
    >
      <div className={styles.transaction}>
        <div className={styles.inner}>
          <div className={styles.table}>
            <div
              className={styles.head}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {depositCaptions.map((caption: any) => (
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
              {getPaginatedTransactions().length > 0 ? getPaginatedTransactions().map((transaction: any) => (
                <Transaction
                  value={selectedFilters?.includes(transaction?.id)}
                  onChange={() => handleChange(transaction?.id)}
                  item={transaction}
                  key={transaction?.id}
                />
              )) : <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginBottom: "10px" }}>
                <p style={{ fontWeight: "bold" }}>No Transaction</p></div>}
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default DepositPage;
