import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import millify from "millify";
import styles from "./BalanceStatistics.module.sass";
import Card from "@/components/Card";
import Select from "@/components/Select";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";

type BalanceStatisticsType = {
  name: string;
  value: number;
};

type BalanceStatisticsProps = {
  items: BalanceStatisticsType[];
};

const BalanceStatistics = ({ items }: BalanceStatisticsProps) => {
  const { durationOptions } = useLanguageConstants();
  const [duration, setDuration] = useState<string>(durationOptions[0].value);
  const { t } = useTranslation()

  const handleChange = (value: string) => setDuration(value);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && !!payload) {
      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>Balance</div>
          <div className={styles.tooltipValue}>${payload[0].value}</div>
        </div>
      );
    }

    return null;
  };

  const formatterYAxis = (value: number) => {
    if (value === 0) {
      return "";
    }
    return `$${millify(value)}`;
  };

  return (
    <Card
      className={styles.card}
      title={t('overviewCategoy.balancesec')}
      tooltip=""
      right={
        <Select
          value={duration}
          onChange={handleChange}
          options={durationOptions}
          small
        />
      }
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={items}
            barSize={30}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} stroke="#DCE4E8" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
                fontWeight: "400",
                fill: "#ACB5BB",
              }}
              dy={5}
            />
            <YAxis
              tickFormatter={formatterYAxis}
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 12,
                fontWeight: "400",
                fill: "#ACB5BB",
              }}
            />
            <Bar dataKey="value" fill="#5FCFB0" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#5FCFB0",
                strokeWidth: 1,
                fill: "transparent",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BalanceStatistics;
