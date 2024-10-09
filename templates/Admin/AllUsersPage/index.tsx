import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import styles from "./TransactionPage.module.sass";
import Transaction from "./Transaction";

import { Context } from "@/components/Context/Context";
import Pagination from "@/components/Pagination";
import useLanguageConstants from "@/hooks/useLanguageConstants";
import { useTranslation } from "react-i18next";
import NavigationAdmin from "@/components/NavigationAdmin";
import getUsers from "pages/api/getUsers";
import Head from "./Head";

interface User {
    id: string;
    name: string;
    lname: string;
    displayName: string;
    email: string;
    username: string;
    freezeType: boolean;
}

const AllUsersPage = () => {
    const { adminAllUsers } = useLanguageConstants();
    const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
    const { t } = useTranslation();
    const breadcrumbs = [
        {
            title: t("dashboardPage.dashboard"),
            url: "/dashboard",
        },
        {
            title: t("adminPage.allusers"),
        },
    ];
    const { user } = useContext(Context);
    const [allUser, setAllUser] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(true);
    const [freezeFilter, setFreezeFilter] = useState<boolean>(false);
    const [unfreezeFilter, setUnfreezeFilter] = useState<boolean>(false);

    const handleChange = (filter: any) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((x: any) => x !== filter));
        } else {
            setSelectedFilters((selectedFilters: any) => [...selectedFilters, filter]);
        }
    };

    const itemsPerPage = 10; // Number of transactions per page

    const totalPages = Math.ceil(allUser?.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getAllUsers = async () => {
        try {
            const users = await getUsers();
            setAllUser(users);
        } catch (err) {
            console.error(err);
        }
    };

    // const getFilteredUsers = () => {
    //     if (!search) return allUser;
    //     return allUser.filter(
    //         (user: User) =>
    //             user?.name?.toLowerCase().includes(search?.toLowerCase()) ||
    //             user?.email?.toLowerCase().includes(search?.toLowerCase()) ||
    //             user?.username?.toLowerCase().includes(search?.toLowerCase())
    //     );
    // };

    const getFilteredUsers = () => {
        let filteredUsers = allUser;
        if (search) {
            const lowercasedSearch = search.toLowerCase();
            console.log(lowercasedSearch, filteredUsers)
            filteredUsers = filteredUsers.filter(
                (user: User) =>
                    user?.name?.toLowerCase().includes(lowercasedSearch) ||
                    user?.lname?.toLowerCase().includes(lowercasedSearch) ||
                    user?.displayName?.toLowerCase().includes(lowercasedSearch) ||
                    user?.email?.toLowerCase().includes(lowercasedSearch) ||
                    user?.username?.toLowerCase().includes(lowercasedSearch)
            );
        }
        if (freezeFilter) {
            filteredUsers = filteredUsers?.filter((user: User) => user?.freezeType === true);
        }
        if (unfreezeFilter) {
            filteredUsers = filteredUsers?.filter((user: User) => user?.freezeType === false);
        }
        return filteredUsers;
    };
    const getPaginatedTransactions = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return getFilteredUsers().slice(startIndex, endIndex);
    };

    const handleFreezeFilter = () => {
        setFreezeFilter(!freezeFilter);
        if (unfreezeFilter) setUnfreezeFilter(false); // Ensure only one filter is active at a time
    };

    const handleUnfreezeFilter = () => {
        setUnfreezeFilter(!unfreezeFilter);
        if (freezeFilter) setFreezeFilter(false); // Ensure only one filter is active at a time
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setCurrentPage(1);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs} head={<NavigationAdmin />}>
            <div className={styles.transaction}>
                <div className={styles.inner}>
                    <div className={styles.table}>
                        <div style={{ paddingBottom: "16px" }}>
                            <Head
                                search={search}
                                setSearch={setSearch}
                                onSubmit={handleSubmit}
                                // onFilter={handleFilter}
                                visible={visible}
                                onFreezeFilter={handleFreezeFilter}
                                onUnfreezeFilter={handleUnfreezeFilter}
                                freezeFilter={freezeFilter}
                                unfreezeFilter={unfreezeFilter}
                            />
                        </div>
                        <div style={{ overflow: 'auto' }}>
                            <div className={styles.head} >
                                {adminAllUsers.map((caption) => (
                                    <div
                                        className={styles.cell}
                                        key={caption.id}
                                        style={{ display: "flex", justifyContent: "center" }}
                                    >
                                        {caption.title}
                                        {caption.sorting && (
                                            <button className={styles.sorting}>
                                                <Icon name="arrow-swap" size="18" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.body}>
                                {getPaginatedTransactions().map((transaction: any) => (
                                    <Transaction
                                        getAllUsers={getAllUsers}
                                        value={selectedFilters?.includes(transaction?.id)}
                                        onChange={() => handleChange(transaction?.id)}
                                        item={transaction}
                                        key={transaction?.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </Layout>
    );
};

export default AllUsersPage;
