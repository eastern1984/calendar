// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDayData } from '../../controllers/DayContentController';
import dbConnect from '../../helpers/dbConnection'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();
    const data = await getDayData(req);

    res.status(200).json({ data })
}
