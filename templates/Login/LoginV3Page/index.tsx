import LayoutLogin from "@/components/LayoutLogin";
import { useTranslation } from "react-i18next";
import styles from "./LoginPage.module.sass";

type LoginPageProps = {};

const LoginPage = ({ }: LoginPageProps) => {
  const { t } = useTranslation();

  return (
    <LayoutLogin
      classLeft={styles.left}
      left={
        <>
          <div className={styles.circles}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.wrap}>
            <div className={styles.title}>{t("loginPage.welcomeTitle")}</div>
            <div className={styles.title}>
              {t('loginPage.webTitle')}
            </div>
            <div className={styles.text}>
              {t('loginPage.webSubtitle')}
            </div>
          </div>
        </>
      }
    />
  );
};

export default LoginPage;
