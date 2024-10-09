import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./Contacts.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

type ContactsType = {
    id: string;
    title: string;
    avatar: string;
    login: string;
    displayName: string;
    email: string;
    photoURL: string;
    wallet: { address: string };
    iuguSubaccount: { account_id: string };
};

type ContactsProps = {
    className?: string;
    items: ContactsType[];
    slidesPerViewTablet: number;
    slidesPerViewDesktop: number;
    searchShow?: boolean;
    setReceiver?: string | any;
    setIuguReceiver?: string | any;
};

const Contacts = ({
    className,
    items,
    slidesPerViewTablet,
    slidesPerViewDesktop,
    searchShow,
    setReceiver,
    setIuguReceiver,
}: ContactsProps) => {
    const [search, setSearch] = useState<string>("");
    const [filteredItems, setFilteredItems] = useState<ContactsType[]>(items);
    const { t } = useTranslation();

    useEffect(() => {
        const filterContacts = () => {
            if (!search) {
                setFilteredItems(items);
                return;
            }

            const filtered = items.filter(
                (item) =>
                    item.displayName.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.wallet.address.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredItems(filtered);
        };

        filterContacts();
    }, [search, items]);

    return (
        <div className={cn(styles.contacts, className)}>
            {searchShow && (
                <form className={styles.search} action="" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder={t("overviewCategory.recent")}
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                    />
                    <button className={styles.button}>
                        <Icon name="search" size="18" />
                    </button>
                </form>
            )}
            {filteredItems.length > 0 && (
                <div className={styles.list}>
                    <Swiper
                        navigation={true}
                        loop={true}
                        modules={[Navigation]}
                        className="contact-swiper"
                        watchSlidesProgress={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: slidesPerViewTablet,
                            },
                            1420: {
                                slidesPerView: slidesPerViewDesktop,
                            },
                        }}
                    >
                        {filteredItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    className={styles.item}
                                    style={{ maxWidth: "100px", overflow: "hidden" }}
                                    onClick={() => {
                                        setReceiver(item?.wallet?.address);
                                        setIuguReceiver(item?.iuguSubaccount?.account_id);
                                    }}
                                >
                                    <div className={styles.avatar}>
                                        <Image
                                            src={item?.photoURL ? item?.photoURL : "/images/avatar0.png"}
                                            style={{ objectFit: "cover" }}
                                            fill
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className={styles.title}>{item?.displayName}</div>
                                    <div className={styles.login}>{item?.email}</div>
                                    <div className={styles.login}>
                                        {item?.wallet
                                            ? `${item?.wallet?.address.slice(0, 6)}..${item?.wallet?.address.slice(-6)}`
                                            : ""}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Contacts;
