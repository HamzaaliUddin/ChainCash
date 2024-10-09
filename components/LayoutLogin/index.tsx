import { useEffect } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import styles from "./LayoutLogin.module.sass";
import Login from "@/components/Login";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSupport/LanguageSelector";

type LayoutProps = {
    background?: string;
    classLeft?: string;
    classRight?: string;
    left: React.ReactNode;
    right?: React.ReactNode;
};

const Layout = ({ background, classLeft, classRight, left, right }: LayoutProps) => {
    const { pathname } = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        clearQueueScrollLocks();
        enablePageScroll();
    }, [pathname]);

    return (
        <>
            <div className={styles.layout} style={{ backgroundColor: background || "#F4F4F7" }}>
                <div className={cn(styles.left, classLeft)}>{left}</div>
                <div className={cn(styles.right, classRight)}>
                    <div className="language rounded-md" style={{ background: "black" }}>
                        <LanguageSelector />
                    </div>
                    <div className={styles.inner}>
                        <div className={styles.wrap}>{right ? right : <Login />}</div>
                        <div className={styles.copyright}>© 2024 {t("login.copyright")}.</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
