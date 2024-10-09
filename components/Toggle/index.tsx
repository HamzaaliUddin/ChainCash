import cn from "classnames";
import styles from "./Toggle.module.sass";

type ToggleProps = {
    className?: string;
    title?: string;
    value: any;
    onChange: any;
};

const Toggle = ({ className, title, value, onChange }: ToggleProps) => (
    <label className={cn(styles.toggle, className)}>
        <input
            className={styles.input}
            type="checkbox"
            value={value}
            onChange={onChange}
            checked={value}
        />
        <span className={styles.inner}></span>
        {title && <span className={styles.title}>{title}</span>}
    </label>
);

export default Toggle;
