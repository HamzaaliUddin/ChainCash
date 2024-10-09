import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import cn from "classnames";
import styles from "./Navigation.module.sass";
import Icon from "@/components/Icon";
import {useTranslation} from 'react-i18next'


type NavigationProps = {};

const Navigation = ({}: NavigationProps) => {
    const router = useRouter();
    const {t} = useTranslation();

    const navigation = [
        {
            title: t("dashboardPageCategories.overview"),
            url: "/dashboard",
        },
        {
            title: t("dashboardPageCategories.transaction"),
            url: "/dashboard/transaction",
        },
        {
            title: t("dashboardPageCategories.commodity"),
            url: "/dashboard/commodity",
        },
    ];
    
    const [startDate, setStartDate] = useState<any>(new Date());

    return (
        <div className={styles.navigation}>
            <nav className={styles.menu}>
                {navigation.map((link, index) => (
                    <Link
                        className={cn(styles.link, {
                            [styles.active]: router.pathname === link.url,
                        })}
                        href={link.url}
                        key={index}
                    >
                        {link.title}
                    </Link>
                ))}
            </nav>
            <div className={styles.date}>
                <DatePicker dateFormat="MMM dd,yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                <Icon name="calendar" />
            </div>
        </div>
    );
};

export default Navigation;
