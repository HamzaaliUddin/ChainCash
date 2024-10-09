import styles from "./Description.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

type DescriptionProps = {
    title: string;
    info?: string;
    onBack?: () => void;
    sucessfully?: boolean;
    arrow?: boolean;
    children: React.ReactNode;
};

const Description = ({
    title,
    info,
    onBack,
    sucessfully,
    arrow,
    children,
}: DescriptionProps) => (
    <div className={styles.description}>
        {arrow && (
            <div className={styles.arrow}>
                <Image
                    src="/images/arrow.svg"
                    width={103}
                    height={72}
                    alt="Arrow"
                />
            </div>
        )}
        {onBack && (
            <button className={styles.back} onClick={onBack}>
                <Icon name="arrow-left" />
            </button>
        )}
        {sucessfully && (
            <div className={styles.icon}>
                <Icon name="check-circle" size="51" />
            </div>
        )}
        <div className={styles.head}>
            <div className={styles.title}>{title}</div>
            {info && <div className={styles.info}>{info}</div>}
        </div>
        {children}
    </div>
);

export default Description;
