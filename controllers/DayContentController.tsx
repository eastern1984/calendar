import DayContent, { IDayView, INIT_DAY_CONTENT } from '../models/DayContent';
import type { NextApiRequest } from 'next'
import moment from 'moment';
import DayEvent, { getLangContentFromEvent, IDayEvent } from '../models/DayEvent';
import { getReadings, getWeekInfo } from '../helpers/tipikonCalculations';
import { dayContentsForDayView } from '../helpers/dayView';

export const DATE_CONTENT_FORMAT = 'MM-DD-YYYY';
export const DATE_EVENT_FORMAT = 'MM-DD';

export const getDayData = async (req: NextApiRequest) => {
    const { query } = req;
    const date = (query && query.month && query.year && query.day) ? moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY') : moment()
    const data = await DayContent.findOne({ date: date.format(DATE_CONTENT_FORMAT) });

    const events = await DayEvent.find({ date: date.format(DATE_EVENT_FORMAT) });

    const eventsAsContent: IDayView = {
        date: date.format(DATE_CONTENT_FORMAT),
        content: (process.env.CSV_SUPPORT_LANGUAGES || "").split(",").map(v => {
            return {
                description: '',
                readings: getReadings(date).apostol + " " + getReadings(date).gospel,
                weekInfoData: getWeekInfo(date),
                lang: v,
                events: events.map(event => ({ ...getLangContentFromEvent(v, event as IDayEvent) })),
            }
        })
    }

    return data ? dayContentsForDayView(data) : { ...eventsAsContent };
};

export const createDayContentData = async (req: NextApiRequest) => {
    const { body } = req;
    const dayContent = new DayContent();

    await DayEvent.deleteMany({ date: body.date });

    dayContent.weekInfo = body.weekInfo;
    dayContent.readings = body.readings;
    dayContent.description = body.description;
    dayContent.events = body.events;
    dayContent.date = body.date;

    return await dayContent.save();
};

export const updateDayContentData = async (req: NextApiRequest) => {
    const { body } = req;
    const dayContent = await DayContent.findById(body._id);

    if (dayContent) {
        dayContent.weekInfo = body.weekInfo;
        dayContent.readings = body.readings;
        dayContent.description = body.description;
        dayContent.events = body.events;
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
    const { query } = req;
    const date = (query && query.month && query.year && query.day) ? moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY') : moment()
    const data = await DayContent.findOne({ date: `${query.month}-${query.day}-${query.year}` });

    const events = await DayEvent.find({ date: date.format(DATE_EVENT_FORMAT) });

    return data?._doc ? { ...data._doc } : {
        ...INIT_DAY_CONTENT, events: [...events], date: `${query.month}-${query.day}-${query.year}`
    };
};

export const getDayContentsData = async (req: NextApiRequest) => {
    const data = await DayContent.find();
    return data;
};