import cn from "classnames";
import styles from "./Transaction.module.sass";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";

type LastTransactionProps = {
  item: any;
};

const LastTransaction = ({ item }: LastTransactionProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.row}>
      <div className={styles.cell}>
        <div className={styles.description}>
          <div className={styles.logo}>
            <Image src={item.image} width={24} height={24} alt="" />
          </div>
          <div className={styles.details}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.business}>{item.business}</div>
          </div>
        </div>
      </div>
      <div className={styles.cell}>
        <div className={styles.date}>{item.date}</div>
        <div className={styles.time}>{item.time}</div>
      </div>
      <div className={styles.cell}>{item.amount}</div>
      <div className={styles.cell}>
        <div
          className={cn(
            {
              [styles.success]: item.status === "Success",
              [styles.pending]: item.status === "Pending",
              [styles.canceled]: item.status === "Canceled",
            },
            styles.status
          )}
        >
          {t(`adminPage.${item.status.toLowerCase()}`)}
        </div>
      </div>
    </div>
  );
};

export default LastTransaction;
