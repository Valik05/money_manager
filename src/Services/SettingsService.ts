import { axiosService } from "../axiosService/axiosService";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { UpdateCurrencyDates, UpdateDailyAmountDates } from "../Models/Settings";

export const getAllCurrencyAPI = async () => {
    try {
        const { data } = await axiosService.get('/currency/all');
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};


export const updateCurrencyAPI = async (dates: UpdateCurrencyDates) => {
    try {
        const { data } = await axiosService.put('/users/settings/update-currency/', dates);
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};


export const updateDailyAmountAPI = async (dates: UpdateDailyAmountDates) => {
    try {
        const { data } = await axiosService.put('/users/settings/update-daily-amount/', dates);
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};