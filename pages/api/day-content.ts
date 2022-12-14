// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function dayContentHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id, name },
        method,
    } = req

    switch (method) {
        case 'DELETE':
            //  await deleteDayContentData(req)
            res.status(200).json({ id, name: `User ${id}` })
            break
        case 'POST':
            //     res.status(200).json({ result: await createDayContentData(req) })
            break
        case 'GET':
            //   await getDayContentData(req)
            res.status(200).json({ id, name: `User ${id}` })
            break
        case 'PUT':
            //     await updateDayContentData(req)
            res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}