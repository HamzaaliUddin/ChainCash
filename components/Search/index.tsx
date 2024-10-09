import Icon from "@/components/Icon";
import cn from "classnames";
import styles from "./Search.module.sass";

type SearchProps = {
    className?: string;
    classInput?: string;
    placeholder: string;
    value: string;
    onChange: any;
    onSubmit: any;
    light?: boolean;
    large?: boolean;
};

const Search = ({
    className,
    classInput,
    placeholder,
    value,
    onChange,
    onSubmit,
    light,
    large,
}: SearchProps) => {
    return (
        <form
            className={cn(
                styles.search,
                { [styles.searchLight]: light, [styles.searchLarge]: large },
                className
            )}
            action=""
            onSubmit={onSubmit}
        >
            <input
                className={cn(styles.input, classInput)}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button className={styles.button}>
                <Icon name="search" />
            </button>
        </form>
    );
};

export default Search;
