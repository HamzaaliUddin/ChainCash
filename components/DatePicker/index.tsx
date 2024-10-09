import DatePicker from "react-datepicker";
import cn from "classnames";
import styles from "./DatePicker.module.sass";
import Icon from "@/components/Icon";

type DateChoiceProps = {
    className?: string;
    label?: string;
    selected?: any;
    selectsRange?: boolean;
    startDate?: any;
    endDate?: any;
    onChange: any;
    placeholderText?: string;
    dateFormat?: string;
    medium?: boolean;
    icon?: boolean;
    props?: any;
};

const DateChoice = ({
    className,
    label,
    selected,
    selectsRange,
    startDate,
    endDate,
    onChange,
    placeholderText,
    dateFormat,
    medium,
    icon,
}: DateChoiceProps) => (
    <div
        className={cn(
            styles.date,
            { [styles.dateIcon]: icon, [styles.dateMedium]: medium },
            className
        )}
    >
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.wrap}>
            <DatePicker
                dateFormat={dateFormat}
                selected={selected}
                selectsRange={selectsRange}
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
                placeholderText={placeholderText}
            />
            {icon && <Icon name="calendar" />}
        </div>
    </div>
);

export default DateChoice;
