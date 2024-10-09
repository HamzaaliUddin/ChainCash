import BalanceStatistics from "@/components/BalanceStatistics";
import ExpenseCategory from "@/components/ExpenseCategory";
import LastTransaction from "@/components/LastTransaction";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import styles from "./StatisticsPage.module.sass";

import { Context } from "@/components/Context/Context";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { balanceStatistics } from "@/mocks/balanceStatistics";
import { expenseCategory } from "@/mocks/expenseCategory";
import { useContext } from "react";
import { useTranslation } from "react-i18next";


const StatisticsPage = () => {
  const { user } = useContext(Context);
  const { lastTransactions } = useLanguageConstants();
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t('dashboardPage.dashboard'),
      url: "/dashboard",
    },
    {
      title: t("notificationPage.statistics"),
    },
  ];

  return (
    <Layout
      title={`${user?.displayName} 👏🏻`}
      breadcrumbs={breadcrumbs}
      head={<Navigation />}
    >
      <div className={styles.row}>
        <div className={styles.col}>
          <ExpenseCategory items={expenseCategory} />
        </div>
        <div className={styles.col}>
          <BalanceStatistics items={balanceStatistics} />
          <LastTransaction items={lastTransactions} />
        </div>
      </div>
    </Layout>
  );
};
export default StatisticsPage;
