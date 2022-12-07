import mongoose from "mongoose";

export interface IEvent {
    category: number;
    serviceType: number;
    saintType: number;
    title: string;
    year: string;
}

export interface IContent {
    weekInfo: string,
    readings: string,
    description: string,
    lang: string,
    events: IEvent[]
}

export interface IDayContent {
    content: IContent[];
    date: string;
    _id?: string;
    deleted?: boolean;
}


interface IDayContentSchema extends IDayContent {
    _id: string;
}

const schema = new mongoose.Schema({
    content: [
        {
            weekInfo: String,
            readings: String,
            description: String,
            lang: String,
            events: [
                {
                    category: Number,
                    serviceType: Number,
                    saintType: Number,
                    title: String,
                    year: String,
                }
            ]
        }
    ],
    date: String
});

export default mongoose.models?.DayContent || mongoose.model<IDayContentSchema>('DayContent', schema);