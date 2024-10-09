import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Logo from "@/components/Logo";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import styles from "./Header.module.sass";
import Notifications from "./Notifications";

import { notifications } from "@/mocks/notifications";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Context } from "../Context/Context";
import LanguageSelector from "../LanguageSupport/LanguageSelector";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { user, combinedData, setUser } = useContext(Context);
    const {
        t,
        i18n: { language },
    } = useTranslation();

    // const navigation = useMemo(
    //   () => [
    //     {
    //       title: t("dashboardPage.dashboard"),
    //       url: "/dashboard",
    //     },
    //     {
    //       title: t("dashboardPage.txHistory"),
    //       url: "/txhistory",
    //     },
    //     {
    //       title: t("dashboardPage.wallets"),
    //       url: "/wallets",
    //     },
    //     {
    //       title: t("dashboardPage.settings"),
    //       url: "/settings",
    //     },
    //     user?.isAdmin && {
    //       title: t("dashboardPage.admin"),
    //       url: "/admin",
    //     },
    //   ].filter(a => a?.url),
    //   [language]
    // );

    const navigation = useMemo(() => {
        const links = [
            {
                title: t("dashboardPage.dashboard"),
                url: "/dashboard",
            },
            {
                title: t("dashboardPage.txHistory"),
                url: "/txhistory",
            },
            {
                title: t("dashboardPage.wallets"),
                url: "/wallets",
            },
            {
                title: t("dashboardPage.settings"),
                url: "/settings",
            },
        ];

        if (user?.isAdmin) {
            links.push({
                title: t("dashboardPage.admin"),
                url: "/admin",
            });
        }

        return links;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, language]);
    const router = useRouter();

    const toggleMenu = () => {
        setVisible(!visible);
        if (visible) {
            enablePageScroll();
        } else {
            disablePageScroll();
        }
    };

    const closeMenu = () => {
        setVisible(false);
        enablePageScroll();
    };

    const signout = (event: any) => {
        event.preventDefault();
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <header className={styles.header}>
                <button
                    className={cn(styles.burger, {
                        [styles.active]: visible,
                    })}
                    onClick={toggleMenu}
                >
                    <Icon name="burger" />
                </button>
                <div
                    className={cn(styles.wrap, {
                        [styles.visible]: visible,
                    })}
                >
                    <Logo className={styles.logo} />
                    <nav className={styles.navigation}>
                        {navigation.map((link, index) => (
                            <Link
                                className={cn(styles.link, {
                                    [styles.active]:
                                        router.pathname === link.url || router.pathname.startsWith(link.url),
                                })}
                                href={link.url}
                                key={index}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                    <Link className={styles.logout} href="/login" onClick={(event) => { signout(event); setUser(null)}}>
                        {t("settingsPage.logout")}
                    </Link>
                    <button className={styles.close} onClick={closeMenu}>
                        <Icon name="close" />
                    </button>
                </div>
                <div className={styles.control}>
                    <LanguageSelector />
                    <Notifications items={combinedData} />
                    <Link className={styles.avatar} href="/settings">
                        <Image
                            src={user?.photoURL ? user?.photoURL : "/images/avatar0.png"}
                            fill
                            style={{ objectFit: "cover" }}
                            alt="Avatar"
                        />
                    </Link>
                </div>
                <div
                    className={cn(styles.overlay, {
                        [styles.visible]: visible,
                    })}
                    onClick={closeMenu}
                ></div>
            </header>
        </>
    );
};

export default Header;
