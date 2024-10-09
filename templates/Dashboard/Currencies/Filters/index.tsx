import { useState } from "react";
import styles from "./Filters.module.sass";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import { useTranslation } from "react-i18next";

type FiltersProps = {};

const Filters = ({}: FiltersProps) => {
    const [typeTransaction, setTypeTransaction] = useState<string>("");
    const [typeBusiness, setTypeBusiness] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const {t} = useTranslation()

    const typeTransactionOptions = [
        {
            title: "Subscribe",
            value: "subscribe",
        },
        {
            title: t('notificationPage.receive'),
            value: "teceive",
        },
        {
            title: t("dashboardPageCategories.transfer"),
            value: "transfer",
        },
    ];

    const typeBusinessOptions = [
        {
            title: "Software",
            value: "software",
        },
        {
            title: "Freelance platform",
            value: "freelance-platform",
        },
        {
            title: "Coffehouse",
            value: "coffehouse",
        },
        {
            title: "Fast Food Restaurant",
            value: "fast-food-restaurant",
        },
        {
            title: "E-Commerce Company",
            value: "e-commerce-company",
        },
    ];
    const statusOptions = [
        {
            title: t('adminPage.success'),
            value: "success",
        },
        {
            title: t('adminPage.pending'),
            value: "pending",
        },
        {
            title: t('adminPage.canceled'),
            value: "canceled",
        },
    ];

    const handleChangeTransaction = (value: string) =>
        setTypeTransaction(value);
    const handleChangeBusiness = (value: string) => setTypeBusiness(value);
    const handleChangeStatus = (value: string) => setStatus(value);

    return (
      <div className={styles.filters}>
        <Select
          className={styles.field}
          classToggle={styles.toggleSelect}
          title={t('notificationPage.transactiontype')}
          value={typeTransaction}
          onChange={handleChangeTransaction}
          options={typeTransactionOptions}
          medium
        />
        <Select
          className={styles.field}
          classToggle={styles.toggleSelect}
          title={t('notificationPage.businesstype')}
          value={typeBusiness}
          onChange={handleChangeBusiness}
          options={typeBusinessOptions}
          medium
        />
        <DatePicker
          className={styles.field}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: any) => {
            setDateRange(update);
          }}
          dateFormat="MM.dd.yyyy"
          placeholderText="Date range"
          medium
          icon
        />
        <Select
          className={styles.field}
          classToggle={styles.toggleSelect}
          title={t("transactionCategory.Status")}
          value={status}
          onChange={handleChangeStatus}
          options={statusOptions}
          medium
        />
      </div>
    );
};

export default Filters;
