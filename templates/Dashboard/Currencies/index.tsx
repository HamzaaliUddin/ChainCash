import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import { useContext, useState } from "react";
import Head from "./Head";
import Transaction from "./Transaction";
import styles from "./TransactionPage.module.sass";

import { Context } from "@/components/Context/Context";
import Pagination from "@/components/Pagination";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";

function CurrenciesPage() {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("dashboardPage.dashboard"),
      url: "/dashboard",
    },
    {
      title: t("notificationPage.currencies"),
    },
  ];
  const [search, setSearch] = useState<string>("");
  const [visibleFilters, setVisibleFilters] = useState<boolean>(false);
  const { countryData, user, CryptoCurrencyData } = useContext(Context);
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const { currencyList } = useLanguageConstants();
  const [currentPage, setCurrentPage] = useState<number>(1); // State to keep track of the current page

  // const handleChange = (filter: any) => {
  //   if (selectedFilters.includes(filter)) {
  //     setSelectedFilters(selectedFilters.filter((x: any) => x !== filter));
  //   } else {
  //     setSelectedFilters((selectedFilters: any) => [
  //       ...selectedFilters,
  //       filter,
  //     ]);
  //   }
  // };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  //   // Reset current page to 1 when searching
  //   setCurrentPage(1);
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const prioritizedCrypto = CryptoCurrencyData.filter(
    (item: any) => item.symbol === "btc" || item.symbol === "usdt" || item.symbol === "usdc" || item.symbol === "matic"
  );

  const mergedData = [...prioritizedCrypto, ...countryData];

  const filteredCountryData = mergedData.filter((transaction: any) => {
    try {
      if (!transaction.name) return false;

      if (search)
        return (
          transaction.name.toLowerCase().includes(search.toLowerCase()) ||
          transaction.currency.toLowerCase().includes(search.toLowerCase())
        );
      return true;
    } catch (error) {
      console.log(error);
    }
  });

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  const totalPages = Number(filteredCountryData.length / 10) || 1;

  return (
    <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs} head={<Navigation />}>
      <div className={styles.transaction}>
        <Head
          search={search}
          setSearch={(e: any) => setSearch(e.target.value)}
          onSubmit={() => console.log("Submit")}
          onFilter={() => setVisibleFilters(!visibleFilters)}
          visible={visibleFilters}
        />
        <div className={styles.inner}>
          <div className={styles.table}>
            <div style={{ display: "flex", justifyContent: "", width: "100%" }}>
              {currencyList.map((caption) => (
                <div
                  className={styles.cell}
                  key={caption.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "200px",
                  }}
                >
                  {caption.title}
                </div>
              ))}
            </div>
            <div>
              {/* {countryData.map((transaction: any) => (
                <Transaction
                  value={selectedFilters.includes(transaction.id)}
                  onChange={() => handleChange(transaction.id)}
                  item={transaction}
                  key={transaction.id}
                />
              ))} */}
              {filteredCountryData.slice(startIndex, endIndex).map((transaction: any) => (
                <Transaction
                  value={selectedFilters.includes(transaction.id)}
                  onChange={() => handlePageChange(transaction.id)}
                  item={transaction}
                  key={transaction.id}
                />
              ))}
            </div>
          </div>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </Layout>
  );
}

export default CurrenciesPage;
