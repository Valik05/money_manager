import { Operation } from "../Models/Operations";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { axiosService } from "../axiosService/axiosService";
import { FieldValues } from "react-hook-form";

export const getOperationsAPI = async () => {
    try {
        const { data } = await axiosService.get<Operation[] | []>('/plans/operations');
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};

export const createOperationAPI = async (dates: FieldValues) => {
    try {
        const { data } = await axiosService.post<Operation>('/plans/operations/create/', dates);
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};