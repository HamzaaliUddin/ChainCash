import styles from "./Notification.module.sass";
import Image from "@/components/Image";

type NotificationProps = {
    item: any;
    user: any;
};

const Notification = ({ item, user }: NotificationProps) => (
    <div className={styles.notification}>
        {(item.sourceAddress || item.request) === user?.wallet?.address && (
            <>
                <div className={styles.icon}>
                    <Image
                        src={`/images/${
                            (item.type === "success" && "success.svg") || (item.type === "recheive" && "recheive.svg")
                        }`}
                        width={24}
                        height={24}
                        alt=""
                    />
                </div>
                <div className={styles.details}>
                    <div className={styles.line}>
                        <div className={styles.title}>
                            {item?.sourceAddress === user?.wallet?.address ? "Transfer" : "Receive"} {item?.status}
                        </div>
                        <div className={styles.time}>{item.dueDate || new Date(item.createdAt).toLocaleString()}</div>
                        {item?.new && <div className={styles.new}>{item?.new}</div>}
                    </div>
                    <div className={styles.info}>{`${item?.coin || item?.assetId} ${item?.amount}`}</div>
                </div>
            </>
        )}
    </div>
);

export default Notification;
