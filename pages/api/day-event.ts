// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createDayEventData, deleteDayEventData, getDayEventData, updateDayEventData } from '../../controllers/DayEventController';
import dbConnect from '../../helpers/dbConnection'

export default async function dayEventHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id, name },
        method,
    } = req
    await dbConnect();

    switch (method) {
        case 'DELETE':
            await deleteDayEventData(req)
            res.status(200).json({ id, name: `User ${id}` })
            break
        case 'POST':
            res.status(200).json({ result: await createDayEventData(req) })
            break
        case 'GET':
            await getDayEventData(req)
            res.status(200).json({ id, name: `User ${id}` })
            break
        case 'PUT':
            await updateDayEventData(req)
            res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}