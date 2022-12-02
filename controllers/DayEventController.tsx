import DayEvent from '../models/DayEvent';
import type { NextApiRequest, NextApiResponse } from 'next'

export const getDayData = async () => {
    const data = await DayEvent.find();
    return data;
};

export const createDayEventData = async (req: NextApiRequest) => {
    const { body } = req;
    const deyEvent = new DayEvent();

    deyEvent.category = body.category;
    deyEvent.saintType = body.saintType;
    deyEvent.date = body.date;
    deyEvent.serviceType = body.serviceType;
    deyEvent.year = body.year;
    deyEvent.titles = [...body.titles];

    return deyEvent.save();
};

export const updateDayEventData = async (req: NextApiRequest) => {
    const data = await DayEvent.find();
    return data;
};

export const deleteDayEventData = async (req: NextApiRequest) => {
    const data = await DayEvent.find();
    return data;
};

export const getDayEventData = async (req: NextApiRequest) => {
    const data = await DayEvent.find();
    return data;
};

export const getDayEventsData = async (req: NextApiRequest) => {
    const data = await DayEvent.find();
    return data;
};