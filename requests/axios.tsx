import React, { createContext, PropsWithChildren, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

//import { getSession, removeSession, setSession } from "../helpers/sessionToken";
import { axiosRequests } from "../requests";
import { IAxiosBaseContext } from "../interfaces/types";

const axiosBaseContext =
    createContext<IAxiosBaseContext | undefined>(undefined);

export const AxiosInstanceProvider: React.FC<PropsWithChildren<{}>> = ({
    children,
}) => {
    /* const client = useQueryClient();
     const router = useRouter();*/
    const apiBase = `/api`;

    const axiosInstance = axios.create({ baseURL: apiBase });
    const requests = axiosRequests(axiosInstance);

    axiosInstance.interceptors.request.use(
        (config) => {
            /* const session = getSession();
             if (session?.accessToken) {
                 // TODO: Remove ts-ignore
                 // @ts-ignore
                 //config.headers.common.authorization = `Bearer ${session.accessToken}`;
                 if (config.headers) {
                     config.headers.authorization = `Bearer ${session.accessToken}`;
                 }
             }*/
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (err) => {
            const originalConfig = err.config;
            /* const session = getSession();
 
              Access Token was expired
             if (
                 err.response.status === 401 &&
                 !originalConfig._retry &&
                 session?.refreshToken
             ) {
                 originalConfig._retry = true;
                 try {
                       const data = await requests.refreshToken(session?.refreshToken ?? "");
                       setSession({ ...data, timestamp: new Date().getTime() });
   
                       axiosInstance.defaults.headers.common.authorization = `Bearer ${data.accessToken}`;
   
                     return axiosInstance(originalConfig);
                 } catch (_error) {
                       removeSession();
                       client.clear();
                       await router.replace(Routes.HOME);
                     return Promise.reject(_error);
                 }
             }*/

            return Promise.reject(err);
        }
    );

    return (
        <axiosBaseContext.Provider value={requests}>
            {children}
        </axiosBaseContext.Provider>
    );
};

export const useGetAxiosRequests = () => {
    const context = useContext(axiosBaseContext);
    if (!context) {
        throw new Error("you dont have axios requests");
    }
    return context;
};
