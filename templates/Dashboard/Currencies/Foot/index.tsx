import Select from "@/components/Select";
import { useState } from "react";
import styles from "./Foot.module.sass";

type FootProps = {};

const Foot = ({}: FootProps) => {
    const showOptions = [
        {
            title: "Show 10",
            value: "10",
        },
        {
            title: "Show 20",
            value: "20",
        },
        {
            title: "Show 30",
            value: "30",
        },
    ];

    const [show, setShow] = useState<string>(showOptions[0].value);

    const handleChange = (value: string) => setShow(value);

    return (
        <div className={styles.foot}>
            <div className={styles.sorting}>
                <div className={styles.text}>Showing 6 of 50 entries</div>
                <Select
                    className={styles.select}
                    classToggle={styles.toggleSelect}
                    value={show}
                    onChange={handleChange}
                    options={showOptions}
                    medium
                    dropdownUp
                />
            </div>
        </div>
    );
};

export default Foot;
