import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import { useContext, useEffect, useState } from "react";
import Transaction from "./Transaction";
import styles from "./TransactionPage.module.sass";

import { Context } from "@/components/Context/Context";
import Pagination from "@/components/Pagination";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";
import axios from "axios";

const TransactionPage = () => {
  const { captions } = useLanguageConstants();
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("dashboardPage.dashboard"),
      url: "/dashboard",
    },
    {
      title: t("dashboardPageCategories.transaction"),
    },
  ];
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);

  const { txdata, setTxdata, user, setTxStatus } = useContext(Context);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const gettx = async () => {
    try {
      const tx: any = await axios.get(`${process.env.NEXT_PUBLIC_URL}/getTransactions`).then((res) => res.data);
      setTxdata(tx);
      const txCompletedlen = tx.filter(
        (i: any) =>
          i.status === "COMPLETED" &&
          i.note !== "Faucets Sent!" &&
          (i.sourceAddress === user?.wallet?.address || i.destinationAddress === user?.wallet?.address)
      );
      setTxStatus((pre: any) => ({ ...pre, COMPLETEDSTATUS: txCompletedlen }));
      setTxStatus((pre: any) => ({ ...pre, COMPLETED: txCompletedlen.length }));
      const txFailedLen = tx.filter((i: any) => i.status === "FAILED");
      setTxStatus((pre: any) => ({ ...pre, FAILED: txFailedLen.length }));
      const txSubmittedLen = tx.filter((i: any) => i.status === "SUBMITTED");
      setTxStatus((pre: any) => ({ ...pre, SUBMITTED: txSubmittedLen.length }));
    } catch (err) {
      console.error(err);
    }
  };

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

  useEffect(() => {
    gettx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout
      title={`${user?.displayName} 👏🏻`}
      breadcrumbs={breadcrumbs}
      head={<Navigation />}
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

export default TransactionPage;
