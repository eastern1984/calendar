import mongoose from "mongoose";

export const INIT_DAY_CONTENT: IDayContent = {
    description: [{ lang: "ru", text: "" }, { lang: "en", text: "" }],
    readings: [{ lang: "ru", text: "" }, { lang: "en", text: "" }],
    weekInfo: [{ lang: "ru", text: "" }, { lang: "en", text: "" }],
    events: [],
    date: ""
};

export interface IDayView {
    date: string,
    content: IDayViewContent[]
}
export interface IDayViewContent {
    description: string,
    readings: string,
    weekInfo?: string,
    weekInfoData?: {
        weekNumberFromPentecost: number,
        glas: number
    },
    lang: string,
    events: {
        year: string,
        category: number,
        serviceType: number,
        saintType: number,
        title: string,
    }[]
}

export interface IEvent {
    category: number;
    serviceType: number;
    saintType: number;
    titles: { text: string; lang: string }[],
    year: string,
}

export interface IDayContent {
    weekInfo: { text: string; lang: string }[],
    readings: { text: string; lang: string }[],
    description: { text: string; lang: string }[],
    events: IEvent[],
    date: string;
    _id?: string;
    deleted?: boolean;
}


interface IDayContentSchema extends IDayContent {
    _id: string;
}

const schema = new mongoose.Schema({
    weekInfo: [{ text: String, lang: String }],
    readings: [{ text: String, lang: String }],
    description: [{ text: String, lang: String }],
    events: [
        {
            category: Number,
            serviceType: Number,
            saintType: Number,
            titles: [{ text: String, lang: String }],
            year: String,
        }
    ],
    date: String
});

export default mongoose.models?.DayContent || mongoose.model<IDayContentSchema>('DayContent', schema);