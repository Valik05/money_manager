import React, { useCallback } from "react";
import { useSystemMsg } from "./useSystemMsg";
import { createContext, useEffect, useState } from "react";
import { CurrencyItem, UpdateCurrencyDates, UpdateDailyAmountDates } from "../Models/Settings";
import { getAllCurrencyAPI, updateCurrencyAPI, updateDailyAmountAPI } from "../Services/SettingsService";
import ContentLoader from "../Components/UI/ContentLoader/ContentLoader";
import { useAuth } from "./useAuth";

type SettingsContextType = {
    currencyList: CurrencyItem[] | [],
    getAllCurrency: () => void,
    updateCurrency: (dates: UpdateCurrencyDates) => void,
    updateDailyAmount: (dates: UpdateDailyAmountDates) => void
};

type Props = { children: React.ReactNode };

const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

export const SettingsProvider = ({ children }: Props) => {
    const { showSystemMsg } = useSystemMsg();
    const { getUser } = useAuth();
    const [currencyList, setCurrencyList] = useState<CurrencyItem[] | []>([]);
    const [isReady, setIsReady] = useState(false);

    const getAllCurrency = useCallback(async () => {
        setIsReady(false)
        await getAllCurrencyAPI()
            .then((res) => {
                if (res) {
                    // console.log(res);
                    setCurrencyList(res)
                }
            })
            .catch((error) => {
                // console.log(error);
                if (typeof error === 'string') return showSystemMsg({ type: 'error', text: error })
            })
            .finally(() => setIsReady(true))
    }, [])

    useEffect(() => {
        getAllCurrency()
    }, [getAllCurrency])

    const updateCurrency = async (dates: UpdateCurrencyDates) => {
        setIsReady(false)
        await updateCurrencyAPI(dates)
            .then((res) => {
                if (res) {
                    // console.log(res);
                    showSystemMsg({ type: 'success', text: 'Currency changed' })
                    getUser()
                }
            })
            .catch((error) => {
                // console.log(error);
                if (typeof error === 'string') return showSystemMsg({ type: 'error', text: error })
            })
            .finally(() => setIsReady(true))
    }

    const updateDailyAmount = async (dates: UpdateDailyAmountDates) => {
        setIsReady(false)
        await updateDailyAmountAPI(dates)
            .then((res) => {
                if (res) {
                    // console.log(res);
                    showSystemMsg({ type: 'success', text: 'Daily amount changed' })
                    getUser()
                }
            })
            .catch((error) => {
                // console.log(error);
                if (typeof error === 'string') return showSystemMsg({ type: 'error', text: error })
            })
            .finally(() => setIsReady(true))
    }


    return (
        <SettingsContext.Provider
            value={{ currencyList, getAllCurrency, updateCurrency, updateDailyAmount }}
        >
            {isReady ? children : <ContentLoader />}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => React.useContext(SettingsContext);