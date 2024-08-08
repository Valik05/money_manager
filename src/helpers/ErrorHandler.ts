import axios from "axios";

export const ErrorHandler = (error: unknown) => {
    console.log(error);
    if (axios.isAxiosError(error)) {
        if (error?.response) {
            if ('data' in error.response) return error.response?.data
        }
        return error.message
    }
};