import axios, { AxiosInstance } from "axios";
//import { getSession } from "../helpers/sessionToken";
import { IAxiosBaseContext } from "../interfaces/types";
import { IDayContent } from "../models/DayContent";
import { IDayEvent } from "../models/DayEvent";

export const getMonthMIReport = (month: string, year: string) => {
    const digitMonth = new Date(Date.parse(month + " 1, 2022")).getMonth() + 1;
    const response = axios.get(`${process.env.NEXT_PUBLIC_APP_API}/api/resources/request/mi-report/${year}/${digitMonth}`, {
        headers: {
            //authorization: `Bearer ${getSession()?.accessToken}`,
        },
        responseType: 'blob'
    }).then((res) => {
        const url = URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.download = `Cop MI Report ${month}-${year}.xls`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    })
    return response;
}

/*export const getRequestReport = (id: any) => {
    const response = axios.get(`${process.env.NEXT_PUBLIC_APP_API}/api/resources/request/request-report/${id}`, {
        headers: {
            authorization: `Bearer ${getSession()?.accessToken}`,
        },
        responseType: 'blob'
    }).then((res) => {
        const url = URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.download = `${id}_ResponseReport.xls`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    })
    return response;
}*/

export const axiosRequests = (instance: AxiosInstance) => {
    return {
        getDayData: async () => {
            const { data } = await instance.post<{ data: any }>("/day",);
            return data.data;
        },
        getDayEvent: async (id: string) => {
            const { data } = await instance.get<{ data: IDayEvent }>(`/day-event/${id}`);
            return data.data;
        },
        getDayEvents: async (filter: string, page: number, limit: number) => {
            const { data } = await instance.get<{ data: any }>(
                `/day-events?DayEventNumber=${filter}&page=${page}&limit=${limit}`,
            );
            return data.data;
        },
        deleteDayEvent: async (id: string) => {
            const { data } = await instance.delete(`/day-event/${id}`);
            return data.data;
        },
        putDayEvent: async params => {
            const { data } = await instance.put<any>(`/day-event/${params.body._id}`, params.body);
            return data;
        },
        postDayEvent: async params => {
            const { data } = await instance.post<any>(`/day-event`, params.body);
            return data;
        },
        getDayContent: async (id: string) => {
            const { data } = await instance.get<{ data: IDayContent }>(`/day-content/${id}`);
            return data.data;
        },
        getDayContents: async (filter: string, page: number, limit: number) => {
            const { data } = await instance.get<{ data: any }>(
                `/day-contents?DayContentNumber=${filter}&page=${page}&limit=${limit}`,
            );
            return data.data;
        },
        deleteDayContent: async (id: string) => {
            const { data } = await instance.delete(`/day-content/${id}`);
            return data.data;
        },
        putDayContent: async params => {
            const { data } = await instance.put<any>(`/day-content`, params.body);
            return data;
        },
        postDayContent: async params => {
            const { data } = await instance.post<any>(`/day-content`, params.body);
            return data;
        },
    } as IAxiosBaseContext;
};
