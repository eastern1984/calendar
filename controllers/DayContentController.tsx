import DayContent from '../models/DayContent';
import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment';

export const DATE_CONTENT_FORMAT = 'MM-DD-YYYY';

export const getDayData = async (req: NextApiRequest) => {
    const { query } = req;
    moment.locale('en');
    const date = (query && query.month && query.year && query.day) ? moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY') : moment()
    const data = await DayContent.findOne({ date: date.format(DATE_CONTENT_FORMAT) });
    return data;
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