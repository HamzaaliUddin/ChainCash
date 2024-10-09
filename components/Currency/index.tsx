import Card from "@/components/Card";
import Image from "@/components/Image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import styles from "./Currency.module.sass";
import { useTranslation } from "react-i18next";
import axios from "axios";

type CurrencyType = {
    id: string;
    title: string;
    price: string;
    description: string;
    image: string;
};

type CurrencyProps = {
    viewItems?: number;
    items: CurrencyType[];
};

const Currency = ({ viewItems, items }: CurrencyProps) => {
    const [currencyList, setCurrencyList] = useState<any>();
    const { countryData, setCountryData, CryptoCurrencyData, setCryptoCurrencyData, user } = useContext(Context);
    const { t } = useTranslation()

    const router = useRouter();
    const userTier = user?.tier;

    const api_uri2 = "https://api.exchangerate-api.com/v4/latest/USD";

    async function fetchData() {
        const response2 = await fetch(api_uri2);
        const jsonData2 = await response2.json();
        const data = jsonData2.rates;
        setCurrencyList(data);
    }

    async function fetchCryptoData() {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
        );
        setCryptoCurrencyData(response.data)
    }

    const fetchCountryData = async () => {
        if (!currencyList) {
            return;
        }
        const fetchData = async (currency: string) => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${currency.slice(0, 2)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching country data:", error);
                return {};
            }
        };

        const updatedRateList = await Promise.all(
            Object.entries(currencyList).map(async ([currency, rate]) => {
                const countryInfo = await fetchData(currency);
                const countryName = countryInfo?.[0]?.name?.common || t('overviewCategory.unknown');
                return {
                    currency,
                    rate,
                    name: countryName,
                };
            })
        );
        const filteredRateList = updatedRateList.filter((item) => item.name !== null && item.name !== t('overviewCategory.unknown'));
        setCountryData(filteredRateList);
    };

    useEffect(() => {
        fetchData();
        fetchCryptoData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currencyList) {
            fetchCountryData();
        }
        // eslint-disable-next-line
    }, [currencyList]);

    return (
        <Card
            title={t('overviewCategory.ratesec')}
            tooltip=""
            onSeeMore={() => router.replace("/dashboard/currencies")}
        >
            <div className={styles.list}>
                {CryptoCurrencyData?.filter((item: any) => item.symbol === 'btc' || item.symbol === 'usdc' || item.symbol === 'usdt' || item.symbol === 'matic').slice(0, 4).map((item: any, idx: number) => (
                    <div className={styles.item} key={idx}>
                        <div className={styles.logo}>
                            <Image
                                width={34}
                                height={34}
                                alt=""
                                className="rounded-full"
                                src={item.image}
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>{item.name}</div>
                            <div className={styles.price}>{(item.current_price + item.current_price * Number(userTier) / 100).toFixed(2)}</div>
                            <div className={styles.description}>{item.symbol.toUpperCase()}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.list}>
                {countryData?.slice(0, viewItems || 3).map((item: any, idx: number) => (
                    <div className={styles.item} key={idx}>
                        <div className={styles.logo}>
                            <Image
                                width={34}
                                height={34}
                                alt=""
                                className="rounded-full"
                                src={`https://flagsapi.com/${item.currency?.slice(0, 2)}/flat/64.png`}
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>{item.name}</div>
                            <div className={styles.price}>{item.rate.toFixed(2)}</div>
                            <div className={styles.description}>{item.currency}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Currency;
