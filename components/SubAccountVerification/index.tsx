import { useContext, useEffect, useState } from "react";
import Card from "@/components/Card";
import cn from "classnames";
import { Context } from "../Context/Context";
import styles from "./SubAccount.module.sass";
import { useTranslation } from "react-i18next";
import Toggle from "../Toggle";
import Field from "../Field";
import { toast } from "react-toastify";
import Select from "../Select";

type TransferProps = {
    className?: string;
};

const SubAccountVerification = ({ className }: TransferProps) => {
    const { user } = useContext(Context);
    const { t } = useTranslation();

    const personType = [
        {
            title: "Individual",
            value: "Individual",
        },
        {
            title: "Legal Person",
            value: "Legal Person",
        },
    ];

    const accountType = [
        {
            title: "Corrente",
            value: "Corrente",
        },
        {
            title: "Poupança",
            value: "Poupança",
        },
        {
            title: "Pagamento",
            value: "Pagamento",
        },
    ];

    const [open, setOpen] = useState<boolean>(false);
    const [subAccountInfo, setSubAccountInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [configdetails, setConfigDetails] = useState<any>({
        account_id: user?.iuguSubaccount?.account_id,
        price_range: "",
        physical_products: false,
        business_type: "",
        person_type: personType[0].value,
        automatic_transfer: false,
        cnpj: "",
        cpf: "",
        company_name: "",
        name: "",
        address: "",
        cep: "",
        city: "",
        district: "",
        state: "",
        telephone: "",
        resp_name: "",
        resp_cpf: "",
        bank: "",
        bank_ag: "",
        account_type: accountType[0].value,
        bank_cc: "",

    })

    const handleChangeAccountType = (value: string) => {
        setConfigDetails((prevConfigDetails: any) => ({
            ...prevConfigDetails,
            account_type: value,
        }));
    };

    const handleChangePersonType = (value: string) => {
        setConfigDetails((prevConfigDetails: any) => ({
            ...prevConfigDetails,
            person_type: value,
        }));
    };

    const getInfo = async () => {
        try {
            const response = await fetch("/api/subAccountInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
            }).then(r => r.json());
            setSubAccountInfo(response.iuguSubAccount);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const applyForVerification = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/subAccountVerification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: configdetails, user }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            if (data.error) {
                setLoading(false);
                return;
            }
            toast.success(t("dashboardPage.subAccount"));
            getInfo();
            setLoading(false);
        } catch (error) {
            // toast.error(t("dashboardPage.errorcreatingsubaccount"));
            console.error("Error creating sub-account:", error);
            setLoading(false);
        }
    };

    return (
        <Card title={"Verification SubAccount"} tooltip="" onSeeMore={() => setOpen(!open)}>
            {open &&
                <div className={cn(styles.row, { [styles.rowColumn]: "" })}>
                    <div style={{ width: "100%" }}>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Field
                                className={styles.field}
                                label={"Price Range"}
                                placeholder={"Price Range"}
                                value={configdetails.price_range}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    price_range: e.target.value
                                }))}
                            />
                            <Toggle
                                className={styles.toggle}
                                title={"Physical Products"}
                                value={configdetails.physical_products}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    physical_products: !prevConfigDetails.physical_products
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Business Type"}
                                placeholder={"Business Type"}
                                value={configdetails.business_type}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    business_type: e.target.value
                                }))}
                            />
                            <Select
                                className={styles.select}
                                label={"Person Type"}
                                value={configdetails?.person_type}
                                onChange={handleChangePersonType}
                                options={personType}
                                style={{ marginBottom: "20px" }}
                            />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <Toggle
                                className={styles.toggle}
                                title={"Automatic Transfer"}
                                value={configdetails.automatic_transfer}
                                onChange={() => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    automatic_transfer: !prevConfigDetails.automatic_transfer
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"CNPJ"}
                                placeholder={"CNPJ"}
                                value={configdetails.cnpj}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    cnpj: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"CPF"}
                                placeholder={"CPF"}
                                value={configdetails.cpf}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    cpf: e.target.value
                                }))}
                            />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <Field
                                className={styles.field}
                                label={"Company Name"}
                                placeholder={"Company Name"}
                                value={configdetails.company_name}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    company_name: e.target.value
                                }))}
                            />

                            <Field
                                className={styles.field}
                                label={"Name"}
                                placeholder={"Name"}
                                value={configdetails.name}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    name: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Address"}
                                placeholder={"Address"}
                                value={configdetails.address}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    address: e.target.value
                                }))}
                            />
                        </div>

                        <div style={{ marginTop: "10px" }}>

                            <Field
                                className={styles.field}
                                label={"Zip Code"}
                                placeholder={"Zip Code"}
                                value={configdetails.cep}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    cep: e.target.value
                                }))}
                            />

                            <Field
                                className={styles.field}
                                label={"city"}
                                placeholder={"city"}
                                value={configdetails.city}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    city: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"District"}
                                placeholder={"District"}
                                value={configdetails.district}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    district: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"State"}
                                placeholder={"State"}
                                value={configdetails.state}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    state: e.target.value
                                }))}
                            />

                            <Field
                                className={styles.field}
                                label={"Telephone"}
                                placeholder={"Telephone"}
                                value={configdetails.telephone}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    telephone: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Resp Name"}
                                placeholder={"Resp Name"}
                                value={configdetails.resp_name}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    resp_name: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Resp Cpf"}
                                placeholder={"Resp Cpf"}
                                value={configdetails.resp_cpf}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    resp_cpf: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Bank"}
                                placeholder={"Bank"}
                                value={configdetails.bank}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    bank: e.target.value
                                }))}
                            />
                            <Field
                                className={styles.field}
                                label={"Bank Ag"}
                                placeholder={"Bank Ag"}
                                value={configdetails.bank_ag}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    bank_ag: e.target.value
                                }))}
                            />
                            <Select
                                className={styles.select}
                                label={"Account Type"}
                                value={configdetails?.account_type}
                                onChange={handleChangeAccountType}
                                options={accountType}
                                style={{ marginBottom: "20px" }}
                            />
                            <Field
                                className={styles.field}
                                label={"Bank CC"}
                                placeholder={"Bank CC"}
                                value={configdetails.bank_cc}
                                onChange={(e: any) => setConfigDetails((prevConfigDetails: any) => ({
                                    ...prevConfigDetails,
                                    bank_cc: e.target.value
                                }))}
                            />
                        </div>

                        <div style={{ marginTop: "10px" }}>
                            <button
                                className={cn("button", className)}
                                disabled={loading}
                                onClick={applyForVerification}
                                style={{
                                    cursor: loading ? "not-allowed" : "pointer"
                                }}
                            >
                                {loading ? "Loading..." : "Apply for Sub Account Verification"}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </Card>
    );
};

export default SubAccountVerification;
