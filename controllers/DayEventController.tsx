//import csv from 'csv-parser';
//import fs from 'fs';
//import DayEvent, { getCategory, getSaintType, getServiceType } from './../db/models/DayEvent';
//import type { NextApiRequest } from 'next'

export const exportFromCsv = async () => {

 /*   const end = new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(__dirname + "/../../../../1.csv")
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            });
    });

    const data: any = await end;

    await DayEvent.destroy({ truncate: true });

    for (let i = 0; i < data.length; i++) {
        console.log(data[i]["Дата"]);
        await DayEvent.create({
            date: `${data[i]["Дата"].split('/')[0]}/${data[i]["Дата"].split('/')[1]}`,
            category: getCategory(data[i]["Категория"]),
            serviceType: getServiceType(data[i]["Служба"]),
            saintType: getSaintType(data[i]["Ранг"]),
            title_en: data[i]["Name"],
            title_ru: data[i]["Имя"],
            year: data[i]["Год"],
        });
    }
*/
    return "Done";
};
/*
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
};*/