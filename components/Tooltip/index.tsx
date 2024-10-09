import {
    PlacesType,
    TooltipWrapper,
    Tooltip as TooltipReact,
} from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import cn from "classnames";
import styles from "./Tooltip.module.sass";
import Icon from "@/components/Icon";

type TooltipProps = {
    className?: string;
    icon?: string;
    content: string;
    place?: PlacesType | undefined;
};

const Tooltip = ({ className, icon, content, place }: TooltipProps) => (
    <>
        <div className={cn(styles.icon, className)}>
            <TooltipWrapper content={content}>
                <Icon name={icon || "info-circle"} size="18" />
            </TooltipWrapper>
        </div>
        <TooltipReact className={styles.tooltip} place={place || "top"} />
    </>
);

export default Tooltip;
