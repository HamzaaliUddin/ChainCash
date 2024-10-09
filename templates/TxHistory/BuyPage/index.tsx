import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import { useContext, useState } from "react";
import styles from "./BuyTransactionPage.module.sass";
import Transaction from "./Transaction";

import { Context } from "@/components/Context/Context";
import NavigationTx from "@/components/NavigationTx";
import Pagination from "@/components/Pagination";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";

const BuyPage = () => {
  const { captions } = useLanguageConstants();
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("dashboardPage.txHistory"),
      url: "/txhistory",
    },
    {
      title: t('tXHistoryPage.buyhistory'),
    },
  ];
  const { txdata, user } = useContext(Context);
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

  const totalPages = Math.ceil(txdata.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedTransactions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return txdata.slice(startIndex, endIndex);
  };

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
              {captions.map((caption) => (
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
                  value={selectedFilters?.includes(transaction?.id)}
                  onChange={() => handleChange(transaction?.id)}
                  item={transaction}
                  key={transaction?.id}
                />
              ))}
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

export default BuyPage;
