// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDayData } from '../../controllers/DayContentController';
import dbConnect from '../../helpers/dbConnection'
import { getDaysFromEaster, getDaysToNextEaster, getPreviousEaster, getWeeksFromEaster, getWeeksToNextEaster } from '../../helpers/tipikonCalculations';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    await dbConnect();
    const data = await getDayData(req);

    res.status(200).json({
        data,
        test: getDaysFromEaster(moment()),
        test2: getDaysToNextEaster(moment()),
        test3: getWeeksFromEaster(moment()),
        test4: getWeeksToNextEaster(moment()),
    })
}
