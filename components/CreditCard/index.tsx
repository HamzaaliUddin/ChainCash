import cn from "classnames";
import styles from "./CreditCard.module.sass";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";

type CreditCardProps = {
  className?: string;
  item: any;
};

const CreditCard = ({ className, item }: CreditCardProps) => {
  const { t } = useTranslation();
  return item ? (
    <div
      className={cn(styles.card, className)}
      style={{ background: item.color }}
    >
      <div className={styles.circles}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.head}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.logo}>
          <Image
            src={`/images/${
              item.type === "visa" ? "visa" : "master"
            }-card-white.svg`}
            width={58}
            height={18}
            style={{ width: "auto", height: "100%" }}
            alt=""
          />
        </div>
      </div>
      <div className={styles.number}>
        **** ***** **** {item.number.slice(-4)}
      </div>
      <div className={styles.foot}>
        <div className={styles.box}>
          <div className={styles.text}>{t("overviewCategory.name")}</div>
          <div className={styles.name}>{item.name}</div>
        </div>
        <div className={styles.date}>{item.date}</div>
      </div>
    </div>
  ) : null;
};

export default CreditCard;
