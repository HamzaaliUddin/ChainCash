import { useState } from "react";
import cn from "classnames";
import styles from "./Analysis.module.sass";
import Card from "@/components/Card";
import Select from "@/components/Select";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";

type AnalysisProps = {
  title: string;
  tooltip: string;
  price: string;
  percent: number;
  expense?: string;
  children: React.ReactNode;
  row?: boolean;
};

const Analysis = ({
  title,
  tooltip,
  price,
  percent,
  expense,
  children,
  row,
}: AnalysisProps) => {
  const { durationOptions } = useLanguageConstants();
  const { t } = useTranslation()
  const [duration, setDuration] = useState<string>(durationOptions[1].value);

  const handleChange = (value: string) => setDuration(value);

  return (
    <Card
      className={cn(styles.card, { [styles.cardRow]: row })}
      title={title}
      tooltip={tooltip}
      right={
        row && (
          <Select
            value={duration}
            onChange={handleChange}
            options={durationOptions}
            small
          />
        )
      }
    >
      <div className={cn(styles.analysis, { [styles.analysisRow]: row })}>
        <div className={styles.details}>
          <div className={styles.box}>
            <div className={styles.price}>{price}</div>
          </div>
          {expense && (
            <div className={cn(styles.expense, percent < 0 && styles.negative)}>
              {t('words.expenseincrease')} <span>{expense}</span> {t('words.thismonth')}
            </div>
          )}
        </div>
        {!row && (
          <div className={styles.select}>
            <Select
              value={duration}
              onChange={handleChange}
              options={durationOptions}
              small
            />
          </div>
        )}
        <div className={styles.chart}>{children}</div>
      </div>
    </Card>
  );
};

export default Analysis;
