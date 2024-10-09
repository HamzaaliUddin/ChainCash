import axios from "axios";

const capitualInstance = axios.create({
    baseURL: "https://trade.capitual.io/api/v1.0",
    headers: {
        Authorization: `Basic ${btoa(
            // `bb05acdb-81e9-432f-82f4-8695b5877d3d:ZAzmPYAxegT4wJ4SJnarhvtujrnqEaikkrdWDwXGkW4tbd7MzX`
            `${process.env.NEXT_PUBLIC_CAPITUAL_CLIENT_ID}: ${process.env.NEXT_PUBLIC_CAPITUAL_CLIENT_SECRET}`
        )}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})


export const getTradesQuotation: (pair: string) => Promise<TradeQuotation> = (pair: string) => new Promise((resolve, reject) => {
    capitualInstance.get(`/trades/quotation?pair=${pair}`)
        .then((res) => {
            resolve(res.data.data);
        })
        .catch((err) => {
            reject(err);
        })
})


export const getTradesOrders: () => Promise<TradeOrder[]> = () => new Promise((resolve, reject) => {
    capitualInstance.get(`/trades/orders`)
        .then((res) => {
            resolve(res.data.data.rows);
        })
        .catch((err) => {
            reject(err);
        })
})


export const getPaymentsInfo: () => Promise<AccountInfo> = () => new Promise((resolve, reject) => {
    capitualInstance.get(`/payments/info`)
        .then((res) => {
            resolve(res.data.data);
        })
        .catch((err) => {
            reject(err);
        })
})

export const getPaymentsBalances: () => Promise<AccountBalance> = () => new Promise((resolve, reject) => {
    capitualInstance.get(`/payments/balance`)
        .then((res) => {
            resolve(res.data.data);
        })
        .catch((err) => {
            reject(err);
        })
})

export const getTradesConfirm: (quote_id: string, amount: string) => Promise<TradeConfirm> = (quote_id: string, amount: string,) => new Promise((resolve, reject) => {
    capitualInstance.post(`/trades/confirm`, {
        quote_id,
        "settlement": "d0",
        amount,
        "currency_in_value": "BRL",
        "currency_exchange": "USDT"
    })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        })
})

export const webhook: (url: string, event_name: string, description: string) => Promise<WebHook> = (url: string, event_name: string, description: string,) => new Promise((resolve, reject) => {
    capitualInstance.post(`/webhooks/configuration`, {
        url,
        event_name,
        description,
    })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        })
})

export interface TradeQuotation {
    "quote_id": string,
    "fx_rate": string,
    "expires_in": number
}

export interface TradeConfirm {
    "order_id": string,
    "crypto_value": string,
    "settlement": string,
    "settlement_date": string,
    "fiat_value": string,
    "currency_exchange": string,
}

export interface TradeOrder {
    "order_id": string,
    "currency_iso": string,
    "fiat_value": string,
    "settlement_date": string,
    "crypto_value": string,
    "fiat_value_paid": string,
    "crypto_value_paid": string,
    "fiat_value_missing": string,
    "fx_rate": string,
    "crypto_value_missing": string,
    "created_at": string,
}

export interface AccountInfo {
    "ispb": string,
    "name": string,
    "branch": string,
    "account": string,
    "taxpayer": string,
    "pixkey": string,
}

export interface AccountBalance {
    "fiat_overpaid": string,
    "fiat_to_settle": string,
    "crypto_to_settle": string,
}
export interface WebHook {
    "url": string,
    "event_name": string,
    "description": string,
}