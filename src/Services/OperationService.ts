import { Operations, OperationSuccessResponce } from "../Models/Operations";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { axiosService } from "../axiosService/axiosService";
import { FieldValues } from "react-hook-form";

export const getOperationsAPI = async () => {
    try {
        const { data } = await axiosService.get<Operations>('/plans/operations');
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};

export const createOperationAPI = async (dates: FieldValues) => {
    try {
        const { data } = await axiosService.post<OperationSuccessResponce>('/plans/operations/create/');
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};