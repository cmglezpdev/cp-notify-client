import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ICodeforcesContest, ICodeforcesContestsResponse } from '@/interface';

type Data = 
| { message: string }
| { contests : ICodeforcesContest[] }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case "GET":
            return getUpcomingContests(req, res);
        default:
            res.status(400).json({ message: "Bad Request" });
    }
}

async function getUpcomingContests(req: NextApiRequest, res: NextApiResponse<Data>) {

    const apiKey = '623b17df35b5154d75f1352c24a56a133ea0f26a';
    const apiSecretKey = 'e3994deb06f46564c5c891d6de6b981ec98dfdf9';
    const time = Math.round(new Date().getTime() / 1000);
    const rand = crypto.randomInt(100000, 999999); // 6 digits
    const toHash = `${rand}/contest.list?apiKey=${apiKey}&time=${time}#${apiSecretKey}`;
    const hash = crypto.createHash('sha512').update(toHash).digest('hex');
    const apiSig = `${rand}${hash}`;

    const codeforcesUrl = `https://codeforces.com/api/contest.list?apiKey=${apiKey}&time=${time}&apiSig=${apiSig}`;

    const response:Response = await fetch('https://codeforces.com/api/contest.list', { method: "GET" });
    const CodeforcesResponse : ICodeforcesContestsResponse = await response.json();
    const upcomingContests = CodeforcesResponse.result.filter(contest => contest.phase === "BEFORE");

    return res.status(200).json({ contests: upcomingContests });
}
