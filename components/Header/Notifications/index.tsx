import { useContext, useState } from "react";
import Link from "next/link";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Notifications.module.sass";
import Icon from "@/components/Icon";
import Notification from "@/components/Notification";

import { NotificationsType } from "@/types/index";
import { useTranslation } from "react-i18next";
import { Context } from "@/components/Context/Context";

type NotificationsProps = {
    items: NotificationsType[];
};

const Notifications = ({ items }: NotificationsProps) => {
    const { user } = useContext(Context);
    const { t } = useTranslation();
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(styles.notifications, {
                    [styles.active]: visible,
                })}
            >
                <button className={styles.button} onClick={() => setVisible(!visible)}>
                    <Icon name="notification" />
                </button>
                <div className={styles.body}>
                    <div className={styles.title}>{t("notificationPage.Notification")}</div>
                    <div className={styles.list}>
                        {items.slice(0, 4).map((notification) => (
                            <Notification item={notification} key={notification.id} user={user} />
                        ))}
                    </div>
                    <Link className="button-stroke button-wide" href="/dashboard/notification">
                        {t("notificationPage.seeMoreNotifications")}
                    </Link>
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Notifications;
