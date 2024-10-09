import Field from "@/components/Field";
import React, { useContext, useState } from "react";
import cn from "classnames";
import styles from "../AddCommodity/AddCommodity.module.sass";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "@/components/Context/Context";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";

function BuyCommodity({
    loading,
    setLoading,
}: {
    loading: boolean | number;
    setLoading: (loading: boolean | number) => void;
}) {
    const { user } = useContext(Context);
    const { t } = useTranslation();

    const [commodityId, setCommodityId] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [commoDetails, setCommoDetails] = useState<any>({
        type: "buyer",
        signatorySeller: "",
        passport: "",
        address: "",
        citystate: "",
        postalZip: "",
        phone: "",
        mobile: "",
        company: "",
        registration: "",
        email1: "",
        email2: "",
        email3: "",
        site: "",
    });

    const uploadFile = async (formData: FormData) => {
        try {
            const formData = new FormData();

            // formData.append("file", file);
            formData.append("vaultAccountId", user?.wallet?.id);
            formData.append("commodityId", commodityId);
            formData.append("price", amount);
            formData.append("commodityDetails", JSON.stringify(commoDetails));
            formData.append("vaultAccountId", user.wallet.id);

            const response = await axios.post(`/api/uploadDataBuyer`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                const { IpfsHash } = response.data;
                // Do something with the IPFS hash if needed
                toast.success("File uploaded successfully.");
            } else {
                console.error("Unexpected status code:", response.status);
                toast.error("Failed to upload file. Please try again later.");
            }
        } catch (error: any) {
            console.error("Error uploading file:", error.message);
            toast.error("Failed to upload file. Please try again later.");
        } finally {
        }
    };

    const buyComodity = async () => {
        // const floatValue = parseInt("0.001", 16);
        // const hexValue = `0x${floatValue.toString(16)}`;
        try {
            setLoading(2);
            const formData = new FormData();
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/buyComodity`, {
                    amount: ethers.utils.parseUnits(amount, "ether"),
                    tokenId: commodityId,
                    vaultAccountId: Number(user?.wallet?.id),
                })
                .then((res) => res.data)
                .then((data) => console.log(data));

            formData.append("vaultAccountId", user?.wallet?.id);
            formData.append("commodityId", commodityId);
            formData.append("price", amount);
            formData.append("commodityDetails", JSON.stringify(commoDetails));
            formData.append("vaultAccountId", user.wallet.id);
            uploadFile(formData);
            setLoading(false);
            toast(t("notificationPage.commoditybuy"));
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            toast.error(err);
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: "10px" }}>{t("commodityCategory.buycommodity")}</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Adjust minmax values as needed
                    gridTemplateRows: "repeat(3, 1fr)",
                    gap: "10px",
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    width: "100%",
                    height: "100%",
                }}
            >
                <Field
                    label={t("commodityCategory.commodityid")}
                    placeholder={t("commodityCategory.commodityid")}
                    type="number"
                    value={commodityId}
                    onChange={(e: any) => setCommodityId(e.target.value)}
                    required
                    min={0}
                />
                <Field
                    label={t("commodityCategory.buycommodity")}
                    placeholder={t("commodityCategory.buycommodity")}
                    type="number"
                    value={amount}
                    onChange={(e: any) => setAmount(e.target.value)}
                    required
                    min={0}
                />
                {/* more fields */}
                <Field
                    // label={t("commodityCategory.signatorySeller")}
                    label={"Signatory Seller"}
                    placeholder={"Signatory Seller"}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.signatorySeller || "CEO/GIULIA LORIADING LIDA"}
                    // onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, [e.target.value]: e.target.value }))}
                    onChange={(e: any) =>
                        setCommoDetails((prev: any) => ({ ...prev, signatorySeller: e.target.value }))
                    }
                    required
                />
                <Field
                    // label={t("commodityCategory.signatorySeller")}
                    label={"Passport No"}
                    placeholder={"Passport No"}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.passport || "YA6764719"}
                    // onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, [e.target.value]: e.target.value }))}
                    onChange={(e: any) => setCommoDetails((prev: any) => ({ ...prev, passport: e.target.value }))}
                    required
                />
                <Field
                    // label={t("commodityCategory.address")}
                    label={"Address"}
                    placeholder={"Address"}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.address || "GRABENACKERSTRASSE 46, CH-6312 STEINHAUSEN, ZUG, SWITZERLAND"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, address: e.target.value }))}
                    required
                />
                <Field
                    // label={t("commodityCategory.city/state")}
                    label={"City / State"}
                    placeholder={"City / State"}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.citystate || "STEINHAUSEN, ZUG, SWITZERLAND"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, citystate: e.target.value }))}
                    required
                />
                <Field
                    // label={t("commodityCategory.city/state")}
                    label={"Postal / Zip Code"}
                    placeholder={"Postal / Zip Code"}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.postalZip || "322.678.962"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, postalZip: e.target.value }))}
                    required
                />
                <Field
                    label={"Phone"}
                    // label={t("commodityCategory.phone")}
                    placeholder={"Phone"}
                    // placeholder={t("commodityCategory.string")}
                    type="number"
                    value={commoDetails.phone || "+41 797654688"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, phone: e.target.value }))}
                    required
                />
                <Field
                    label={"Mobile"}
                    // label={t("commodityCategory.mobile")}
                    placeholder={"Mobile"}
                    // placeholder={t("commodityCategory.string")}
                    type="number"
                    value={commoDetails.mobile || "+41 797654688"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, mobile: e.target.value }))}
                    required
                />
                <Field
                    label={"Company"}
                    // label={t("commodityCategory.company")}
                    placeholder={t("Company")}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.company || "BRIDGE SUISSE GMBH"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, company: e.target.value }))}
                    required
                />
                <Field
                    label={"Registration"}
                    // label={t("commodityCategory.registration")}
                    // placeholder={t("commodityCategory.string")}
                    placeholder={t("Registration")}
                    type="string"
                    value={commoDetails.registration || "CHE-322.678.962"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, registration: e.target.value }))}
                    required
                />
                <Field
                    label={"Email1"}
                    // label={t("commodityCategory.email1")}
                    placeholder={t("Email1")}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.email1 || "giulia.lori@bridgesuisse.ch"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, email1: e.target.value }))}
                    required
                />
                <Field
                    label={"Email2"}
                    // label={t("commodityCategory.email2")}
                    placeholder={t("Email2")}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.email2 || "info@bridgesuisse.ch"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, email2: e.target.value }))}
                    required
                />
                <Field
                    label={"Email3"}
                    // label={t("commodityCategory.email3")}
                    placeholder={t("Email3")}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.email3 || "food@bridgesuisse.ch"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, email3: e.target.value }))}
                    required
                />
                <Field
                    label={"Site"}
                    // label={t("commodityCategory.site")}
                    placeholder={t("Site")}
                    // placeholder={t("commodityCategory.string")}
                    type="string"
                    value={commoDetails.site || "N/A"}
                    onChange={(e: any) => setCommoDetails((pre: any) => ({ ...pre, site: e.target.value }))}
                    required
                />
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button
                    style={{ marginTop: "16px", width: "200px" }}
                    className={cn("button-small", styles.button)}
                    onClick={buyComodity}
                >
                    {loading === 2 ? t("overviewCategory.loading") + "..." : t("overviewCategory.buy")}
                </button>
            </div>
        </div>
    );
}

export default BuyCommodity;
