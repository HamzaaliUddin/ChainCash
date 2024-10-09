import Currency from "@/components/Currency";
import ExpenseCategory from "@/components/ExpenseCategory";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import PocketPlans from "@/components/PocketPlans";
import RecentActivity from "@/components/RecentActivity";
import TotalBalance from "@/components/TotalBalance";
import styles from "./DashboardV4Page.module.sass";

import { Context } from "@/components/Context/Context";
import { activity } from "@/mocks/activity";
import { currency } from "@/mocks/currency";
import { expenseCategory } from "@/mocks/expenseCategory";
import { plans } from "@/mocks/plans";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

type DashboardPageProps = {};

const DashboardPage = ({}: DashboardPageProps) => {
  const { user } = useContext(Context);
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      title: t("dashboardPage.dashboard"),
      url: "/dashboard",
    },
    {
      title: t("dashboardPageCategories.overview"),
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
          <TotalBalance />
          <ExpenseCategory items={expenseCategory} column />
        </div>
        <div className={styles.col}>
          <PocketPlans items={plans} row />
        </div>
        <div className={styles.col}>
          <div className={styles.card}>
            <RecentActivity viewItems={4} items={activity} />
          </div>
          <div className={styles.card}>
            <Currency viewItems={2} items={currency} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
