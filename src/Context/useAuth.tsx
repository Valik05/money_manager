import React from "react";
import { UserProfile } from "../Models/User";
import { FieldValues } from "react-hook-form";
import { useSystemMsg } from "./useSystemMsg";
import { useNavigate } from "react-router-dom";
import { getUserAPI } from "../Services/UserServiece";
import { createContext, useEffect, useState } from "react";
import { axiosService } from "../axiosService/axiosService";
import { loginAPI, registerAPI } from "../Services/AuthService";
import Loader from "../Components/UI/Loader/Loader";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (dates: FieldValues) => void;
    loginUser: (dates: FieldValues) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const { showSystemMsg } = useSystemMsg();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const access = localStorage.getItem("accessToken");
        getUserAPI()
            .then((res) => {
                if (res) {
                    console.log(res);
                    setUser(res)
                    navigate('/profile')
                    axiosService.defaults.headers.common["Authorization"] = "Bearer " + access;
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setIsReady(true))
    }, [token]);
    const registerUser = async (dates: FieldValues) => {
        setIsReady(false)
        await registerAPI(dates)
            .then((res) => {
                if (res) {
                    showSystemMsg({ type: 'success', text: 'Account created' })
                    navigate('/auth/sign-in')
                }
            })
            .catch((error) => {
                if (typeof error === 'object') {
                    if ('email' in error && Array.isArray(error.email)) return showSystemMsg({ type: 'error', text: error.email[0] })
                }
                if (typeof error === 'string') return showSystemMsg({ type: 'error', text: error })
            })
            .finally(() => setIsReady(true))
    };

    const loginUser = async (dates: FieldValues) => {
        setIsReady(false)
        await loginAPI(dates)
            .then((res) => {
                if (res) {
                    showSystemMsg({ type: 'success', text: 'Succesful Login' });
                    localStorage.setItem("refreshToken", res.refresh);
                    localStorage.setItem("accessToken", res.access);
                    setToken(res.access);
                    navigate("/profile");
                }
            })
            .catch((error) => {
                if (typeof error === 'object') {
                    if ('detail' in error) return showSystemMsg({ type: 'error', text: error.detail })
                }
                if (typeof error === 'string') return showSystemMsg({ type: 'error', text: error })
            })
            .finally(() => setIsReady(true))
    };

    const isLoggedIn = () => !!user;

    const logout = () => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        setUser(null);
        setToken("");
        navigate("/auth/sign-in");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : <Loader />}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);