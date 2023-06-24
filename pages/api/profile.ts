import type { NextApiRequest, NextApiResponse } from 'next'
import { ICache, IUser, Platform } from '@/interface'
import { MemoryCache } from '@/utils';
import { ScrapperAtCoder } from '@/Scrappers';

type Data = 
    | { ok: boolean, message: string }
    | { ok: boolean, user: IUser | null }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case 'GET':
            return getProfile(req, res);
        default:
            return res.status(400).json({ ok: false, message: "Bad request" });
    }
}

const cache: ICache = new MemoryCache();

async function getProfile(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { platform, handle } = req.query;
    if(!platform) return res.status(400).json({ ok: false, message: 'The platform is required in the params' });
    if(!handle) return res.status(400).json({ ok: false, message: 'The user handle is required in the params' });

    switch( platform as Platform ) {
        case 'CODEFORCES':
            const urlCodeforces = `https://codeforces.com/api/user.info?handles=${handle}`;
            const response: Response = await fetch(urlCodeforces, { method: 'GET' });
            const resp = await response.json();
            if(resp.status === 'OK') {
                return res.status(200).json({ ok: true, user: resp.result[0] });
            } else {
                return res.status(400).json({ ok: false, message: 'Fail to obtain codeforces user information' });
            }
        case 'ATCODER':
            const scrapper = new ScrapperAtCoder();
            const user = await scrapper.getProfile(handle as string);
            return res.status(200).json({ ok: true, user });
        default:
            return res.status(500).json({ ok: false, message: `The platform ${platform} doesn't a valid platform` });
    }

}
