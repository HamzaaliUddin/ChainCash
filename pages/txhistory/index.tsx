import type { NextPage } from "next";
import DashboardPage from "@/templates/TxHistory/DashboardPage";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace("/txhistory/deposit");
    });
    return <DashboardPage />;
};

export default Dashboard;
