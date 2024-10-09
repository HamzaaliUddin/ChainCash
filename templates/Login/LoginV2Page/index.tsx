import Image from "@/components/Image";
import LayoutLogin from "@/components/LayoutLogin";
import { useTranslation } from "react-i18next";
import styles from "./LoginPage.module.sass";

type LoginPageProps = {};

const LoginPage = ({ }: LoginPageProps) => {
  const { t } = useTranslation();

  return (
    <LayoutLogin
      classLeft={styles.left}
      background="#1A1C1E"
      left={
        <Image
          src="/images/bg.png"
          fill
          style={{ objectFit: "cover", objectPosition: "50% 20%" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          alt="Dashboard"
        />
      }
      right={
        <div className={styles.head}>
          <div className={styles.title}>{t("loginPage.welcomeTitle")}</div>
          <div className={styles.info}>
            {t('loginPage.webTitle')}
          </div>
        </div>
      }
    />
  );
};

export default LoginPage;
