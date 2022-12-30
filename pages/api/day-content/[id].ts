// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteDayContentData, getDayContentData, updateDayContentData } from '../../../controllers/DayContentController';
import dbConnect from '../../../helpers/dbConnection';
export default async function dayContentHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req
    await dbConnect();

    switch (method) {
        case 'DELETE':
            id && await deleteDayContentData(id as string)
            res.status(200).json({ id, name: `User ${id}` })
            break
        case 'GET':
            const data = await getDayContentData(req)
            res.status(200).json({ data })
            break
        case 'PUT':
            await updateDayContentData(req)
            res.status(200).json({ id, name: `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}