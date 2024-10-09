import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import styles from "./TransactionPage.module.sass";

import { Context } from "@/components/Context/Context";
import { useTranslation } from "react-i18next";
import NavigationAdmin from "@/components/NavigationAdmin";
import Field from "@/components/Field";
import getTax from "pages/api/getTax";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-toastify";

const TaxPage = () => {
    const { user } = useContext(Context);
    const { t } = useTranslation();
    const [taxValues, setTaxValues] = useState({
        normalUserTax: "3.5",
        specialUserTax: "0.9",
    });

    const breadcrumbs = [
        {
            title: t("dashboardPage.dashboard"),
            url: "/dashboard",
        },
        {
            title: t("adminPage.allusers"),
        },
    ];

    const handleTaxChange = (fieldName: any) => (e: any) => {
        setTaxValues({ ...taxValues, [fieldName]: e.target.value });
    };
    const saveTaxValuesToFirebase = async () => {
        try {
            await setDoc(doc(db, "TaxQoute", user.uid), taxValues);
            fetchData();
            toast.success("Tax values saved successfully!");
        } catch (error) {
            console.error("Error saving tax values: ", error);
        }
    };

    const fetchData = async () => {
        try {
            const data = await getTax();
            if (data && data.length > 0) {
                const taxData = data[0];
                setTaxValues({
                    normalUserTax: taxData.normalUserTax,
                    specialUserTax: taxData.specialUserTax,
                });
            }
        } catch (error) {
            console.error("Error fetching tax values: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Layout title={`${user?.displayName} 👏🏻`} breadcrumbs={breadcrumbs} head={<NavigationAdmin />}>
            <div className={styles.transaction}>
                <h1 className={styles.heading}>Tax</h1>
                <div className={styles.box}>
                    <Field
                        value={taxValues?.normalUserTax}
                        onChange={handleTaxChange("normalUserTax")}
                        label="Tax For Normal User"
                        className={styles.input}
                    />
                    <Field
                        value={taxValues?.specialUserTax}
                        onChange={handleTaxChange("specialUserTax")}
                        label="Tax For Special User"
                        className={styles.input}
                    />
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            gap: "10px",
                            padding: "10px",
                            backgroundColor: "#31b099",
                            borderRadius: "10px",
                            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.25)",
                            fontWeight: "bold",
                            cursor: "pointer",
                            textAlign: "center",
                            marginTop: "20px",
                            color: "white",
                        }}
                        onClick={saveTaxValuesToFirebase}
                        role="button"
                    >
                        Save Tax Values
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TaxPage;
