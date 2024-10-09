import Icon from "@/components/Icon";
import Image from "@/components/Image";
import cn from "classnames";
import { useMemo, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Select.module.sass";
import Field from "../Field";

type OptionType = {
    title: string;
    image?: string;
    value: string;
    color?: string;
};

type SelectProps = {
    className?: string;
    classToggle?: string;
    label?: string;
    title?: string;
    value: string;
    onChange: (value: string) => void;
    options: OptionType[];
    medium?: boolean;
    small?: boolean;
    dropdownUp?: boolean;
    searchOptions?: boolean;
    style?: any;
};

const Select = ({
    className,
    classToggle,
    label,
    title,
    value,
    onChange,
    options,
    medium,
    small,
    dropdownUp,
    style,
    searchOptions
}: SelectProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const activeOption = options.filter((option) => option.value === value);

    const handleChange = (value: string) => {
        onChange(value);
        setVisible(false);
    };

    const filteredOptions = useMemo(() => {
        return searchOptions ? options.filter((option: any) => option.value.toLowerCase().includes(searchValue.toLowerCase()) || option.title.toLowerCase().includes(searchValue.toLowerCase())) : options
    }, [searchOptions, searchValue, options])

    return (
        <div
            className={cn(
                styles.select,
                {
                    [styles.active]: visible,
                    [styles.selectMedium]: medium,
                    [styles.selectSmall]: small,
                },
                className
            )}
            style={style}
        >
            {label && <div className={styles.label}>{label}</div>}
            <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
                <div className={styles.inner}>
                    <button
                        className={cn(
                            styles.toggle,
                            {
                                [styles.active]: visible,
                            },
                            classToggle
                        )}
                        onClick={() => setVisible(!visible)}
                        type="button"
                    >
                        {activeOption.length > 0 ? (
                            <>
                                {activeOption[0].image && (
                                    <div className={styles.preview}>
                                        <Image
                                            src={activeOption[0].image}
                                            width={40}
                                            height={40}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                            alt=""
                                        />
                                    </div>
                                )}
                                {activeOption[0].color && (
                                    <Icon className={styles.drop} name="drop" fill={activeOption[0].color} />
                                )}
                                <div className={styles.value}>{activeOption[0].title}</div>
                            </>
                        ) : (
                            <div className={styles.title}>{title}</div>
                        )}
                        <div className={styles.icon}>
                            <Icon name="arrow-down" />
                        </div>
                    </button>
                    {visible && (
                        <div
                            className={cn(styles.dropdown, {
                                [styles.dropdownUp]: dropdownUp,
                            })}
                        >
                            {searchOptions&&<Field
                                className={styles.field}
                                placeholder={'Search...'}
                                type="text"
                                value={searchValue}
                                onChange={async (e: any) => {
                                    setSearchValue((e.target.value))
                                }}
                                required
                            />}
                            {[
                                filteredOptions.map((option, index) => (
                                    <button
                                        className={cn(styles.option, {
                                            [styles.active]: value === option.value,
                                        })}
                                        onClick={() => handleChange(option.value)}
                                        type="button"
                                        key={index}
                                    >
                                        {option.image && (
                                            <div className={styles.preview}>
                                                <Image
                                                    src={option.image}
                                                    width={40}
                                                    height={40}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                        {option.color && (
                                            <Icon className={styles.drop} name="drop" fill={option.color} />
                                        )}
                                        {option.title}
                                    </button>
                                )),
                            ]}
                        </div>
                    )}
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default Select;
