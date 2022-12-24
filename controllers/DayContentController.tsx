import DayContent from '../models/DayContent';
import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment';
import DayEvent, { getLangContentFromEvent, IDayEvent } from '../models/DayEvent';
import { getDaysFromEaster, getDaysToNextEaster, getReadings, getWeekInfo, getWeeksFromEaster, getWeeksToNextEaster } from '../helpers/tipikonCalculations';

export const DATE_CONTENT_FORMAT = 'MM-DD-YYYY';
export const DATE_EVENT_FORMAT = 'MM-DD';

export const getDayData = async (req: NextApiRequest) => {
    const { query } = req;
    const date = (query && query.month && query.year && query.day) ? moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY') : moment()
    const data = await DayContent.findOne({ date: date.format(DATE_CONTENT_FORMAT) });

    const events = await DayEvent.find({ date: date.format(DATE_EVENT_FORMAT) });

    const eventsAsContent = {
        date: date.format(DATE_CONTENT_FORMAT),
        content: (process.env.CSV_SUPPORT_LANGUAGES || "").split(",").map(v => {
            return {
                readings: getReadings(date).apostol + " " + getReadings(date).gospel,
                weekInfo: getWeekInfo(date),
                lang: v,
                events: events.map(event => ({ ...getLangContentFromEvent(v, event as IDayEvent) })),
            }
        })
    }

    return data ? { ...data._doc, _id: undefined } : { ...eventsAsContent };
};

export const createDayContentData = async (req: NextApiRequest) => {
    const { body } = req;
    const dayContent = new DayContent();

    dayContent.content = [...body.content];
    dayContent.date = body.date;

    return dayContent.save();
};

export const updateDayContentData = async (req: NextApiRequest) => {
    const { body } = req;
    const dayContent = await DayContent.findById(body._id);

    if (dayContent) {
        dayContent.content = [...body.content];
        dayContent.date = body.date;
        return dayContent.save();
    }

    return "Not found";
};

export const deleteDayContentData = async (req: NextApiRequest) => {
    const data = await DayContent.find();
    return data;
};

export const getDayContentData = async (req: NextApiRequest) => {
    const data = await DayContent.find();
    return data;
};

export const getDayContentsData = async (req: NextApiRequest) => {
    const data = await DayContent.find();
    return data;
};