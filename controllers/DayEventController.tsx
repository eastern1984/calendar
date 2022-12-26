import fs from 'fs';
import csv from 'csv-parser';
import moment from 'moment';
import DayEvent, { getCategory, getSaintType, getServiceType } from '../models/DayEvent';
import type { NextApiRequest, NextApiResponse } from 'next'
import { DATE_EVENT_FORMAT } from './DayContentController';

export const exportFromCsv = async () => {
    const end = new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(__dirname + "/../../../../1.csv")
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            });
    });

    const data: any = await end;

    await DayEvent.deleteMany({});

    for (let i = 0; i < data.length; i++) {
        const date = moment(`${data[i]["Дата"].split('/')[0]}-${data[i]["Дата"].split('/')[1]}`, 'MM-DD')
        const dayEvent = new DayEvent();

        // console.log(data[i]["Ранг"], getSaintType(data[i]["Ранг"]), `${date.format(DATE_EVENT_FORMAT)}`);

        console.log(data.length);
        dayEvent.date = `${date.add(13, "days").format(DATE_EVENT_FORMAT)}`;
        dayEvent.category = getCategory(data[i]["Категория"]);
        dayEvent.serviceType = getServiceType(data[i]["Служба"]);
        dayEvent.saintType = getSaintType(data[i]["Ранг"]);
        dayEvent.titles = [{ text: data[i]["Имя"], lang: "ru" }, { text: data[i]["Name"], lang: "en" }];
        dayEvent.year = data[i]["Год"];
        await dayEvent.save();
    }

    return "Done";
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