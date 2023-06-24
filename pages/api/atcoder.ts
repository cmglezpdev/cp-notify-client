import type { NextApiRequest, NextApiResponse } from 'next'
import { IContest, ICache } from '@/interface';
import { MemoryCache } from '@/utils';
import {  } from '../../interface';
import { ScrapperAtCoder } from '@/Scrappers';

type Data = 
| { ok: boolean, message: string }
| { ok: boolean, contests : IContest[] }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case "GET":
            return getUpcomingContests(req, res);
        default:
            res.status(400).json({ ok: false, message: "Bad Request" });
    }
}

const cache: ICache = new MemoryCache()

async function getUpcomingContests(req: NextApiRequest, res: NextApiResponse<Data>) {

    const cacheContest: IContest[] | null = cache.get<IContest[]>('atcoder-contests');
    if(cacheContest) {
        return res.status(200).json({ ok: true, contests: cacheContest });
    }

    try {
        const scrapper = new ScrapperAtCoder();
        const contests: IContest[] = await scrapper.getContests();
        cache.set('atcoder-contests', contests);
        return res.status(200).json({ ok: true, contests });
    } catch (e) {
        res.status(400).json({ ok: false, message: 'Fail to obtain the atcoder contests' });
    }
}
