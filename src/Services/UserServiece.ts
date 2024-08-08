import { axiosService } from "../axiosService/axiosService";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { UserProfile } from "../Models/User";

export const getUserAPI = async () => {
    try {
        const { data } = await axiosService.get<UserProfile>('/users/profile/', {
            transformRequest: [(data, headers) => {
                headers['Authorization'] = "Bearer " + localStorage.getItem('accessToken');
                return data
            }]
        });
        return data;
    } catch (error) {
        throw ErrorHandler(error)
    }
};