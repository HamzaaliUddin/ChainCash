import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import styles from "./Settings.module.sass";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { Context } from "../Context/Context";


type SettingsProps = {
    title: string;
    tooltip: string;
    children: React.ReactNode;
};

const Settings = ({ title, tooltip, children }: SettingsProps) => {
    const { t } = useTranslation()
    const { setUser } = useContext(Context)
    const navigation = [
        {
            title: t('settingsPage.personalinformation'),
            icon: "user",
            url: "/settings",
        },
        {
            title: t('settingsPage.security'),
            icon: "security",
            url: "/settings/security",
        },
        {
            title: t('settingsPage.logout'),
            icon: "logout",
            url: "/login",
        },
    ];
    const router = useRouter();
    const clearUserLocalStorage = () => {
        localStorage.removeItem('user');
    };

    const signout = (event: any) => {
        event.preventDefault();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                clearUserLocalStorage();
                setUser(null);
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    return (
        <div className={styles.settings}>
            <div className={styles.menu}>
                {navigation.map((link, index) => (
                    <button key={index} onClick={link.title === t('settingsPage.logout') ? signout : undefined}>
                        <Link
                            className={cn(styles.link, {
                                [styles.active]: router.pathname === link.url,
                            })}
                            href={link.url}
                            key={index}
                        >
                            <div className={styles.icon}>
                                <Icon name={link.icon} size="20" />
                            </div>
                            {link.title}
                            <Icon className={styles.arrow} name="arrow-next" size="20" />
                        </Link>
                    </button>
                ))}
            </div>
            <Card className={styles.card} title={title} tooltip={tooltip}>
                <div className={styles.wrap}>{children}</div>
            </Card>
        </div>
    );
};

export default Settings;
