import { IDayContent } from "../models/DayContent";
import { IDayEvent } from "../models/DayEvent";

export enum QueryKeys {
    DAY = "DAY",
    DAY_EVENTS = "DAY_EVENTS",
    DAY_CONTENT = "DAY_EVENT",
}

export enum Routes {
    CONTACTS = "/contacts",
    TABLE = "/day-event",
    TABLE_CONTENT = "/day-content",
    CALENDAR = "/",
}

export interface IAxiosBaseContext {
    getDayData: (year: string, month: string, day: string) => Promise<any>;
    getDayEvent: (id: string) => Promise<any>;
    getDayEvents: (filter: string, page: number, limit: number) => Promise<any>;
    deleteDayEvent: (id: string) => Promise<any>;
    postDayEvent: (params: { body: IDayEvent }) => Promise<any>;
    putDayEvent: (params: { body: IDayEvent }) => Promise<any>;
    getDayContent: (year: string, month: string, day: string) => Promise<any>;
    getDayContents: (filter: string, page: number, limit: number) => Promise<any>;
    deleteDayContent: (id: string) => Promise<any>;
    postDayContent: (params: { body: IDayContent }) => Promise<any>;
    putDayContent: (params: { body: IDayContent }) => Promise<any>;
}