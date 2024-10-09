import { Context } from "@/components/Context/Context";
import Layout from "@/components/Layout";
import NavigationTx from "@/components/NavigationTx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "./DashboardPage.module.sass";

type DashboardPageProps = {};

const DashboardPage = ({ }: DashboardPageProps) => {
  const { user } = useContext(Context);
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      title: t("dashboardPage.txHistory"),
      url: "/dashboard",
    },
    {
      title: t("dashboardPage.overview"),
    },
  ];
  return (
    <Layout
      title={`${user?.displayName} 👏🏻`}
      breadcrumbs={breadcrumbs}
      head={<NavigationTx />}
    >
      <div className={styles.row}>
        <div className={styles.col}>
        </div>
        <div className={styles.col}>
          <div className={styles.line}>
            <div className={styles.cell}>
            </div>
            <div className={styles.cell}>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.card}>
          </div>
          <div className={styles.card}>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
