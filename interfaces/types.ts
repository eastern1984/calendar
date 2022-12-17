
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
    getDayContent: (id: string) => Promise<any>;
    getDayContents: (filter: string, page: number, limit: number) => Promise<any>;
    deleteDayContent: (id: string) => Promise<any>;
    postDayContent: (params: { body: any }) => Promise<any>;
    putDayContent: (params: { body: any }) => Promise<any>;
}

export interface IDayEvent {
    date: string,
    category: number | null,
    serviceType: number | null,
    saintType: number | null,
    title_ru: string,
    title_en: string,
    year: string,
}

export const CATEGORY = [
    "Святой", "Литургия", "Двунадесятый праздник"
]

export const SERVICE_TYPE = [
    { name: 'Нет Знака', img: "" },
    { name: 'Бдение', img: "/images/2-holiday.svg" },
    { name: 'Полиелей', img: "/images/3-holiday.svg" },
    { name: 'Славословие', img: "/images/4-holiday.svg" },
    { name: 'Шестеричная', img: "/images/5-holiday.svg" },
]

export const SAINT_TYPE = [
    'Свт.', 'Мч.', 'Св.', 'Прпмч.', 'Свщмч.', 'Прав.', 'Прп.', 'Прор.'
]
