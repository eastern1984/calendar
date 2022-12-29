import { IDayContent, IDayView } from "../models/DayContent"

export const dayContentsForDayView = (data: IDayContent): IDayView => ({
    date: data.date,
    content: ("en,ru").split(",").map(v => {

        return {
            description: data.description.find(r => r.lang === v)?.text || "",
            readings: data.readings.find(r => r.lang === v)?.text || "",
            weekInfo: data.weekInfo.find(r => r.lang === v)?.text || "",
            lang: v,
            events: data.events.map(event => ({
                year: event.year,
                category: event.category,
                serviceType: event.serviceType,
                saintType: event.saintType,
                title: event.titles.find(t => t.lang === v)?.text || "",
            })),
        }
    })
})