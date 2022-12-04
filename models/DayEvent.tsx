import mongoose from "mongoose";

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

interface IDayEventSchema extends IDayEvent {
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

export default mongoose.models?.DayEvent || mongoose.model<IDayEventSchema>('DayEvent', schema);