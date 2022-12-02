import mongoose from "mongoose";

export const CATEGORY = [
    "Святой", "Литургия", "Двунадесятый праздник"
]

export const SERVICE_TYPE = [
    'Бдение', 'Шестеричная', 'Полиелей'
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