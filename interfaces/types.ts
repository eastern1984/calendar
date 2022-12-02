import { IDayEvent } from "../models/DayEvent";

export enum QueryKeys {
    DAY = "DAY",
    DAY_EVENTS = "DAY_EVENTS",
}

export enum Routes {
    CONTACTS = "/contacts",
    TABLE = "/day-event",
    CALENDAR = "/",
}

export interface IAxiosBaseContext {
    getDayData: () => Promise<any>;
    getDayEvent: (id: string) => Promise<any>;
    getDayEvents: (filter: string, page: number, limit: number) => Promise<any>;
    deleteDayEvent: (id: string) => Promise<any>;
    postDayEvent: (params: { body: IDayEvent }) => Promise<any>;
    putDayEvent: (params: { body: IDayEvent }) => Promise<any>;
}