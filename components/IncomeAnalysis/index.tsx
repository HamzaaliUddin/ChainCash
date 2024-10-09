import Analysis from "@/components/Analysis";
import millify from "millify";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import styles from "./IncomeAnalysis.module.sass";
import { t } from "i18next";

type IncomeAnalysisType = {
    name: string;
    value: number;
};

type IncomeAnalysisProps = {
    items: IncomeAnalysisType[];
    expense?: string;
    row?: boolean;
    totalIncome: string;
};

const IncomeAnalysis = ({ items, expense, row, totalIncome }: IncomeAnalysisProps) => {
    const formatterYAxis = (value: number) => {
        if (value === 0) {
            return "";
        }
        return `${millify(value)}`;
    };

    return (
        <Analysis
            title={t('overviewCategory.incomesec')}
            tooltip=""
            price={`$${Number(totalIncome).toFixed(2)}`}
            percent={3.1}
            expense={expense}
            row={row}
        >
            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={items}
                        barSize={20}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#DCE4E8" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fontSize: 12,
                                fontWeight: "400",
                                fill: "#ACB5BB",
                            }}
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
                        <Bar dataKey="value" fill="#E7854D" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Analysis>
    );
};

export default IncomeAnalysis;
