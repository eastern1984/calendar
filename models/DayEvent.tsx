import mongoose from "mongoose";

export const getServiceType = (text: string) => {
    const index = SERVICE_TYPE.findIndex(v => v.name === text.trim());
    return (index === -1) ? null : index;
}

export const getCategory = (text: string) => {
    const index = CATEGORY.findIndex(v => v === text.trim());
    return (index === -1) ? null : index;
}

export const getSaintType = (text: string) => {
    const index = SAINT_TYPE.findIndex(v => v === text.trim());
    return (index === -1) ? null : index;
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
    'Ап.', 'Апп.', 'Свт.', 'Свтт.', 'Мч.', 'Мчч.', 'Прп.', 'Прпп.', 'Свщмч.', 'Свщмчч.', 'Прав.', 'Прмч.', 'Прмчч.', 'Прор.', 'Св.', 'Свв.', 'Блж.', 'Равноап.', 'Равноапп.', 'Собор святых', 'Перенесение мощей', 'Бессребреников'
]

export interface IDayEvent {
    _id?: string;
    date: string;
    category: number;
    serviceType: number;
    saintType: number;
    titles: { text: string; lang: string }[];
    year: string;
    deleted?: boolean;
}

export interface IDayEventSchema extends IDayEvent {
    _id: string;
}

const schema = new mongoose.Schema({
    date: String,
    category: Number,
    serviceType: Number,
    saintType: Number,
    titles: [{ text: String, lang: String }],
    year: String
});

export const getLangContentFromEvent = (lang: string, event: IDayEvent) => ({
    category: event.category,
    serviceType: event.serviceType,
    saintType: event.saintType,
    title: event.titles.find(v => v.lang === lang)?.text || "",
    year: event.year
})


export default mongoose.models?.DayEvent || mongoose.model<IDayEventSchema>('DayEvent', schema);