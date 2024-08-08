import axios, { AxiosError } from "axios";
import ErrorAuthHandler from "../helpers/ErrorAuthHandler";

const baseURL = import.meta.env.VITE_APP_BASE_API_URL;

const axiosService = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});

axiosService.interceptors.response.use(undefined, async (error) => {
    if (error instanceof AxiosError && error?.response?.status === 401 && error?.response?.config?.url !== "users/refresh-token/") {
        return ErrorAuthHandler(axiosService, error)
    }
    throw error
})


export { axiosService }