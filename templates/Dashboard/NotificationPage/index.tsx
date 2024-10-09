import DatePicker from "@/components/DatePicker";
import Layout from "@/components/Layout";
import Notification from "@/components/Notification";
import Search from "@/components/Search";
import { useContext, useEffect, useState } from "react";
import styles from "./NotificationPage.module.sass";

import { notifications } from "@/mocks/notifications";
import { useTranslation } from "react-i18next";
import { Context } from "@/components/Context/Context";
import getDeposit from "pages/api/getDepositRequest";

type NotificationPageProps = {};

type CombinedData = {
    id: string;
    date: string;
    type: string;
    // Add other relevant fields here
    [key: string]: any;
};

const NotificationPage = ({}: NotificationPageProps) => {
    const { t } = useTranslation();
    const breadcrumbs = [
        {
            title: t("dashboardPage.dashboard"),
            url: "/dashboard",
        },
        {
            title: t("notificationPage.Notification"),
        },
    ];
    const { user, combinedData } = useContext(Context);
    const [search, setSearch] = useState<string>("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // const filterData = () => {
    //     return combinedData.filter((item) => {
    //         const itemDate = new Date(item.date);
    //         const matchesSearch = search === "" || item.type.toLowerCase().includes(search.toLowerCase());
    //         const matchesDateRange = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
    //         return matchesSearch && matchesDateRange;
    //     });
    // };

    // const filteredData = filterData();

    return (
        <Layout
            classHead={styles.layoutHead}
            classBody={styles.layoutBody}
            title={`${user?.displayName} 👏🏻`}
            breadcrumbs={breadcrumbs}
        >
            <div className={styles.notifications}>
                <div className={styles.head}>
                    <Search
                        className={styles.search}
                        placeholder={t("notificationPage.searchnotifications")}
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                        onSubmit={() => console.log("Submit")}
                    />
                    <DatePicker
                        className={styles.datepicker}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update: any) => {
                            setDateRange(update);
                        }}
                        dateFormat="MM.dd.yyyy"
                        placeholderText="Range date"
                        medium
                        icon
                    />
                </div>
                <div className={styles.list}>
                    {combinedData.map((notification: any) => (
                        <Notification item={notification} key={notification.id} user={user} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default NotificationPage;
