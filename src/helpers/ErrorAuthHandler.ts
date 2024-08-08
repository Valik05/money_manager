import { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse } from "axios";

type waitResolver = (isAuth: boolean) => void;

let waitAuth: boolean = false;
let waitQueue: waitResolver[] = [];

const ErrorAuthHandler = async (instance_axios: AxiosInstance, error: AxiosError): Promise<AxiosResponse> => {
    let isAuth = false;
    if (!waitAuth) {
        waitAuth = true
        try {
            const refresh = localStorage.getItem("refreshToken")
            const { data } = await instance_axios.post('users/refresh-token/', { refresh },
                {
                    transformRequest: [(data: object, headers: AxiosRequestHeaders) => {
                        delete headers['Authorization']
                        return JSON.stringify(data);
                    }],
                }
            )
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            isAuth = true
        } catch (error) {
            isAuth = false
        }
        waitQueue.forEach(item => Promise.resolve(item(isAuth)));
        waitQueue = [];
        waitAuth = false;
    } else {
        isAuth = await new Promise(res => waitQueue.push(res))
    }
    if (!isAuth) throw error
    return instance_axios({ ...error.config }).then(res => res)
};

export default ErrorAuthHandler;
