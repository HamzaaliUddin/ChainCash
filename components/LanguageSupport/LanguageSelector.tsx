import { Menu } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.sass";

let countries = [
    {
        code: "en",
        name: "English",
        country_code: "gb",
    },
    {
        code: "ar",
        name: "Arabic",
        country_code: "ar",
    },
    {
        code: "pt",
        name: "Portuguese",
        country_code: "pt",
    },
    {
        code: "de",
        name: "Spanish",
        country_code: "de",
    },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    return (
        <Menu as="div" className={styles.menu} aria-label="usermenu">
            <Menu.Button className={styles.menuButton} aria-label="usermenu-button">
                <GlobeAltIcon className="h-7 w-7 cursor-pointer  text-blue-600" />
            </Menu.Button>
            <Menu.Items
                aria-label="menu-item-container"
                className="z-10 mx-3 absolute bottom-modal right-0 min-w-max mt-1 rounded-md shadow-lg bg-white"
            >
                <div className="px-1 items-gap py-1" aria-label="menu-items">
                    {countries.map((lng) => {
                        return (
                            <Menu.Item key={lng.code}>
                                <button
                                    className={"flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer"}
                                    onClick={() => i18n.changeLanguage(lng.code)} // used to change language that needs to be rendered
                                    disabled={i18n.language === lng.code}
                                >
                                    <span className={`fi fi-${lng.country_code}`}></span>
                                    <span>{lng.name}</span>
                                </button>
                            </Menu.Item>
                        );
                    })}
                </div>
            </Menu.Items>
        </Menu>
    );
};

export default LanguageSelector;
