// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
//import { exportFromCsv } from '../../controllers/DayEventController';
import DayEvent, { getLangContentFromEvent } from '../../db/models/DayEvent';
import { getReadings, getWeekInfo } from '../../helpers/tipikonCalculations';

export const DATE_CONTENT_FORMAT = 'MM-DD-YYYY';
export const DATE_EVENT_FORMAT = 'M/D';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const { query } = req;
    const date = (query && query.month && query.year && query.day) ? moment(`${query.month}-${query.day}-${query.year}`, 'MM-DD-YYYY') : moment()
    const events = await DayEvent.findAll({
        where: { date: date.format(DATE_EVENT_FORMAT) }
    });
    //const data = await DayContent.findOne({ date: date.format(DATE_CONTENT_FORMAT) });
    const eventsAsContent = {
        date: date.format(DATE_CONTENT_FORMAT),
        content: (process.env.CSV_SUPPORT_LANGUAGES || "").split(",").map(v => {
            return {
                readings: getReadings(date).apostol + " " + getReadings(date).gospel,
                weekInfo: getWeekInfo(date),
                lang: v,
                events: events.map(event => ({ ...getLangContentFromEvent(v, event) })),
            }
        })
    }

    res.status(200).json({
        data: { ...eventsAsContent },
    })
}
