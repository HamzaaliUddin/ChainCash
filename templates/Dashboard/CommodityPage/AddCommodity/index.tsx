import Field from "@/components/Field";
import Select from "@/components/Select";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AddCommodity.module.sass";
import cn from "classnames";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "@/components/Context/Context";
import addCommodities from "pages/api/addCommodities";
import { useTranslation } from "react-i18next";
import { IoPersonOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { BiConfused, BiSmile } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import { MdDataSaverOff } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

function AddCommodity({
    loading,
    setLoading,
    setComodityIdData,
}: {
    loading: boolean | number;
    setLoading: (loading: boolean | number) => void;
    comodityIdData: (data: any) => void;
    setComodityIdData: (data: any) => void;
}) {
    const { t } = useTranslation();

    
    const cards = [
        {
            title: t("overviewCategory.rice"),
            value: "0",
        },
        {
            title: t("overviewCategory.sugar"),
            value: "1",
        },
        {
            title: t("commodityCategory.corn"),
            value: "2",
        },
    ];

    // const handleChangePage = () => setActiveTab((prev) => prev + 1);
    const [enabledTabs, setEnabledTabs] = useState<boolean[]>([true, false, false, false, false, false]);

    const handleChangePage = () => {
        setActiveTab((prev) => prev + 1);
        setEnabledTabs((prev) => {
            const newEnabledTabs = [...prev];
            newEnabledTabs[activeTab + 1] = true;
            return newEnabledTabs;
        });
    };
    const  handePreviousPage =()=>{
        setActiveTab((prev) => prev - 1);
        setEnabledTabs((prev) => {
            const newEnabledTabs = [...prev];
            newEnabledTabs[activeTab - 1] = true;
            return newEnabledTabs;
        });
    }
    const tabs = [
        {
            title: "Personal Details",
            content: <Step1 onClick={handleChangePage}  />,
            step: "Step 1",
            icon: <IoPersonOutline />,
        },
        {
            title: "Employee Details",
            content: <Step2 onClick={handleChangePage} onPrevious={handePreviousPage} />,
            step: "Step 2",
            icon: <GoHome />,
        },
        {
            title: "Review",
            content: <Step3 onClick={handleChangePage} onPrevious={handePreviousPage} />,
            step: "Step 3",
            icon: <BsPersonCheck />,
        },
        {
            title: "Submit",
            content: <Step4 onClick={handleChangePage} onPrevious={handePreviousPage} />,
            step: "Step 4",
            icon: <BiSmile />,
        },
        {
            title: "Submit",
            content: <Step5 onClick={handleChangePage} onPrevious={handePreviousPage} />,
            step: "Step 5",
            icon: <MdDataSaverOff  />,
        },
        {
            title: "Submit",
            content: <Step6 />,
            step: "Step 6",
            icon: <GiConfirmed />,
        },
    ];

    const [card, setCard] = useState<string>(cards[1].value);
    const [price, setPrice] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [activeTab, setActiveTab] = useState(0);
    const [dueDays, setDueDays] = useState<string>("");
    const [commoDetails, setCommoDetails] = useState<any>({
        type: "seller",
        signatorySeller: "",
        address: "",
        citystate: "",
        phone: "",
        mobile: "",
        company: "",
        registration: "",
        email1: "",
        email2: "",
        email3: "",
        site: "",
        cgcMpa: "",
        aqsicGacc: "",
        siteAqsicGacc: "",
    });

    const {
        user,
        userType,
        commodityType,
        type,
        quantity,
        value,
        otherParticularities,
        createCommidity,
        setCreateCommidity,
        userCard,
    } = useContext(Context);

    const handleChange = (value: string) => setCard(value);

    // const handleTabClick = (index: any) => {
    //     setActiveTab(index);
    // };

    const handleTabClick = (index: number) => {
        if (enabledTabs[index]) {
            setActiveTab(index);
        }
    };
    
    const uploadFile = async (formData: FormData) => {
        try {
            // formData.append("file", file);
            formData.append("vaultAccountId", user?.wallet?.id);
            formData.append("commodityname", card);
            formData.append("price", price);
            formData.append("buyer", address);
            formData.append("seller", user?.wallet?.address);
            formData.append("dueDays", dueDays);
            formData.append("commodityDetails", JSON.stringify(commoDetails));

            const response = await axios.post(`/api/uploadData`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                const { IpfsHash } = response.data;
                console.log("File uploaded successfully. IPFS hash:", IpfsHash);
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

    const addComodity = async () => {
        try {
            setLoading(0);
            // Creating formData object
            const formData = new FormData();

            // Appending commoDetails to formData
            Object.keys(commoDetails).forEach((key) => {
                formData.append(key, commoDetails[key]);
            });

            // Making POST request with formData
            await axios
                .post(`${process.env.NEXT_PUBLIC_URL}/addComodity`, {
                    commodityname: Number(card),
                    price: price,
                    buyer: address,
                    dueDays: dueDays,
                    vaultAccountId: Number(user.wallet.id),
                })
                .then((res) => res.data)
                .then(async (data) => {
                    await axios
                        .post(`${process.env.NEXT_PUBLIC_URL}/commodities`, {
                            comodityId: Number(parseInt(data?.commodityId?.hex, 16).toLocaleString()),
                            vaultAccountId: Number(user.wallet.id),
                        })
                        .then((res) => res.data)
                        .then(async (data1) => {
                            await addCommodities({
                                commodityId: Number(parseInt(data?.commodityId?.hex, 16).toLocaleString()),
                                //
                                userType: userType,
                                commodityType: commodityType,
                                type: type,
                                quantity: quantity,
                                value: value,
                                otherParticularities: otherParticularities,
                                createCommidity: createCommidity,
                                userCard: userCard,
                                //
                                commodityName: card,
                                commodityPrice: price,
                                signatorySeller: commoDetails?.signatorySeller || "",
                                residencyAddress: commoDetails?.address || "",
                                cityState: commoDetails?.citystate || "",
                                phone: commoDetails?.phone || "",
                                mobile: commoDetails?.mobile || "",
                                company: commoDetails?.company || "",
                                registration: commoDetails?.registration || "",
                                email1: commoDetails?.email1 || "",
                                email2: commoDetails?.email2 || "",
                                email3: commoDetails?.email3 || "",
                                site: commoDetails?.site || "",
                                cgcMpa: commoDetails?.cgcMpa || "",
                                aqsicGacc: commoDetails?.aqsicGacc || "",
                                siteAqsicGacc: commoDetails?.siteAqsicGacc || "",
                                buyer: address,
                                seller: user?.wallet?.address,
                                status: data1[4] || 0,
                                dueDate: `${new Date().getUTCDate() + Number(dueDays)} / ${
                                    new Date().getUTCMonth() + 1
                                } / ${new Date().getUTCFullYear()}`,
                                userid: user.id,
                                transactionHash: data?.txHash,
                            });
                            setComodityIdData(data1);
                            formData.append("vaultAccountId", user?.wallet?.id);
                            formData.append("commodityId", parseInt(data?.commodityId?.hex, 16).toLocaleString());
                            formData.append("commodityname", card);
                            formData.append("price", price);
                            formData.append("buyer", address);
                            formData.append("dueDays", dueDays);
                            formData.append("txHash", data?.txHash);
                            // formData.append("commodityDetails", JSON.stringify(commoDetails));
                            setLoading(false);
                            toast(t("notificationPage.commoditycreated"));
                            uploadFile(formData);
                        });
                });

            // Appending other data to formData
            // formData.append("commodityId", Number(parseInt(data1?.commodityId?.hex, 16).toLocaleString());
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            toast.error(err.message || t("overviewCategory.fielderror"));
        }
    };
    console.log(createCommidity);
    if (createCommidity) {
        console.log(user, userType, commodityType, type, quantity, value, otherParticularities, createCommidity);
        addComodity();
        setCreateCommidity(false);
    } else {
        console.log("commidity data does not add ");
    }

    return (
        <div>
            {/* <input type="file" id="file" ref={inputFile} onChange={(e) => handleChange1(e)} />
            <button disabled={uploading} onClick={uploadFile}>
                {uploading ? "Uploading..." : "Upload"}
            </button> */}
            <h1 style={{ marginBottom: "10px" }}>{t("commodityCategory.createcommodity")}</h1>
            <form onSubmit={(e) => e.preventDefault()} className={styles.tabs}>
                <div className={styles.tabList}>
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            // className={`${styles.tab} ${index === activeTab ? styles.active : ""}`}
                            className={`${styles.tab} ${index === activeTab ? styles.active : ""} ${enabledTabs[index] ? "" : styles.disabled}`}
                            onClick={() => handleTabClick(index)}
                        >
                            <div className={styles.iconColor}>{tab.icon}</div>
                            {tab.step}
                        </div>
                    ))}
                </div>
                <div className={styles.tabContent}>{tabs[activeTab].content}</div>
            </form>

            {/* <div
        style={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            paddingInline: "5rem",
          }}
          className={cn("button-small", styles.button)}
          onClick={addComodity}
        >
          {loading === 0
            ? t("overviewCategory.loading") + "..."
            : t("commodityCategory.add")}
        </button>
      </div> */}
        </div>
    );
}

export default AddCommodity;
