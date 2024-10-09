import cn from "classnames";
import styles from "./Details.module.sass";
import { useTranslation } from "react-i18next";

type DetailsProps = {
  item: any;
};

const Details = ({ item }: DetailsProps) => {
  const { t } = useTranslation()
  return (
    <div className={styles.details}>
      <div className={styles.cell}>
        <div className={styles.label}>{t('notificationPage.paidby')}</div>
        <div className={styles.text}>{item.paidBy}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.label}>{t('notificationPage.accounttype')}</div>
        <div className={styles.text}>{item.accountType}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.transfer}>{t('notificationPage.transfersend')}</div>
        <div className={styles.date}>{item.transferSend}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.transfer}>{t('notificationPage.transferreceive')}</div>
        <div className={styles.date}>{item.transferReceive}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.label}>
          {t("overviewCategory.Accountnumber")}
        </div>
        <div className={styles.text}>{item.accountNumber}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.label}>{t('notificationPage.transactionid')}</div>
        <div className={styles.text}>{item.transactionId}</div>
      </div>
      <div className={styles.cell}>
        <button className={cn("button-wide", styles.button)}>{t('notificationPage.print')}</button>
      </div>
    </div>
  );
};

export default Details;
