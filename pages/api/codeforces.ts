import type { NextApiRequest, NextApiResponse } from 'next'
import { ICodeforcesContestsResponse, IContest } from '@/interface';
import { MemoryCache } from '@/utils';
import { ICache } from '../../interface';

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

    const cacheContest: IContest[] | null = cache.get<IContest[]>('codeforces-contests');
    if(cacheContest) {
        return res.status(200).json({ ok: true, contests: cacheContest });
    }
    
    try {
        const response:Response = await fetch('https://codeforces.com/api/contest.list', { method: "GET" });
        const CodeforcesResponse : ICodeforcesContestsResponse = await response.json();
        const upcomingContests = CodeforcesResponse.result.filter(contest => contest.phase === "BEFORE");
    
        upcomingContests.sort((contestA, contestB) => contestA.startTimeSeconds - contestB.startTimeSeconds);
    
        const contests : IContest[] = upcomingContests.map(contest => ({
          id: contest.id,
          name: contest.name,
          type: contest.type,
          platform: 'CODEFORCES',
          durationSeconds: contest.durationSeconds,
          startTimeSeconds: contest.startTimeSeconds * 1000,
          link: `https://codeforces.com/contests/${contest.id}`,
        }))
    
        cache.set('codeforces-contests', contests);
        return res.status(200).json({ ok: true, contests });
        
    } catch (e) {
        res.status(400).json({ ok: false, message: "Fail to obtain codeforces contests" });
    }

}
