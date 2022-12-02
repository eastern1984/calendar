import type { NextApiRequest, NextApiResponse } from 'next'
import { getDayEventsData } from '../../controllers/DayEventController';
import dbConnect from '../../helpers/dbConnection'

export default async function dayEventsHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id, name },
        method,
    } = req
    await dbConnect();

    res.status(200).json({ data: await getDayEventsData(req) })
}