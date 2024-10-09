import { useState } from "react";
import styles from "./LastTransaction.module.sass";
import Card from "@/components/Card";
import Select from "@/components/Select";
import Transaction from "./Transaction";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";

type LastTransactionType = {
  id: string;
  name: string;
  image: string;
  business: string;
  date: string;
  time: string;
  amount: string;
  status: string;
};

type LastTransactionProps = {
  items: LastTransactionType[];
};

const LastTransaction = ({ items }: LastTransactionProps) => {
  const { durationOptions } = useLanguageConstants();
  const [duration, setDuration] = useState<string>(durationOptions[0].value);
  const {t} = useTranslation()
  const handleChange = (value: string) => setDuration(value);

  return (
    <Card
      title={t('notificationPage.lasttransaction')}
      tooltip=""
      right={
        <Select
          className={styles.select}
          value={duration}
          onChange={handleChange}
          options={durationOptions}
          small
        />
      }
    >
      <div className={styles.transactions}>
        <div className={styles.table}>
          {items.map((transaction) => (
            <Transaction item={transaction} key={transaction.id} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LastTransaction;
