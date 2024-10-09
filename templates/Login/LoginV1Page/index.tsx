import styles from "./LoginPage.module.sass";
import LayoutLogin from "@/components/LayoutLogin";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";

type LoginPageProps = {};

const LoginPage = ({ }: LoginPageProps) => {
  const { t } = useTranslation();
  return (
    <LayoutLogin
      classLeft={styles.left}
      left={
        <>
          <div className={styles.images}>
            <Image
              src="/images/bg.png"
              width={1004}
              height={743}
              style={{ width: "100%", height: "auto" }}
              alt="Dashboard"
            />
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
}

export default LoginPage;
