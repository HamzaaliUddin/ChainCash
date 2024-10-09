import cn from "classnames";
import styles from "./Card.module.sass";
import Tooltip from "@/components/Tooltip";
import Icon from "@/components/Icon";
import { useTranslation } from "react-i18next";

type CardProps = {
    className?: string;
    title: string;
    tooltip?: string;
    onSeeMore?: () => void;
    center?: React.ReactNode;
    right?: React.ReactNode;
    children: React.ReactNode;
};

const Card = ({
    className,
    title,
    tooltip,
    onSeeMore,
    center,
    right,
    children,
}: CardProps) => {
    const {t} = useTranslation()
    return (
    <div className={cn(styles.card, className)}>
        <div className={styles.head}>
            <div className={styles.title}>
                {title}
                {tooltip && (
                    <Tooltip className={styles.tooltip} content={tooltip} />
                )}
            </div>
            {center}
            {onSeeMore && (
                <button className={styles.more} onClick={onSeeMore}>
                    {t('overviewCategory.seemore')} <Icon name="arrow-thick-right" size="14" />
                </button>
            )}
            {right && <div className={styles.right}>{right}</div>}
        </div>
        {children}
    </div>
)
};

export default Card;
