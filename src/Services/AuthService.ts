import { FieldValues } from "react-hook-form";
import { axiosService } from "../axiosService/axiosService";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { LoginSuccessResponce, RegisterSuccessResponce } from "../Models/Auth";

export const loginAPI = async (dates: FieldValues) => {
    try {
        const { data } = await axiosService.post<LoginSuccessResponce>('/users/login/', dates);
        console.log(data);
        return data;
    } catch (error) {
        console.log(ErrorHandler(error));
        throw ErrorHandler(error)
    }
};

export const registerAPI = async (dates: FieldValues) => {
    try {
        const { data } = await axiosService.post<RegisterSuccessResponce>('users/register/', dates);
        console.log(data);
        return data;
    } catch (error: unknown) {
        console.log(ErrorHandler(error));
        throw ErrorHandler(error)
    }
};