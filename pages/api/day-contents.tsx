import type { NextApiRequest, NextApiResponse } from 'next'
import { getDayContentsData } from '../../controllers/DayContentController';
import dbConnect from '../../helpers/dbConnection'

export default async function dayContentsHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id, name },
        method,
    } = req
    await dbConnect();

    res.status(200).json({ data: await getDayContentsData(req) })
}