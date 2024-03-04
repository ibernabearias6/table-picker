import { NextApiRequest, NextApiResponse } from 'next';
import { getAsync } from '../../../../prisma/user';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST')
        {
            const { user, password } = req.body;
            const result = await getAsync(user, password);
            if (result)
            {
                return res.status(200).json(result);
            }
            return res.status(400);
        }
    } catch (error: any) {
        return res.status(500).json({ ...error, message: error.message })
    }
}