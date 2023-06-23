import type { NextApiRequest, NextApiResponse } from 'next'
import { ICache, IUser, Platform } from '@/interface'
import { MemoryCache } from '@/utils';

type Data = 
    | { ok: boolean, message: string }
    | { ok: boolean, user: IUser }

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

    const url = `https://codeforces.com/api/user.info?handles=${handle}`;
    const response: Response = await fetch(url, { method: 'GET' });
    const resp = await response.json();
    if(resp.status === 'OK') {
        return res.status(200).json({ ok: true, user: resp.result[0] });
    } else {
        return res.status(400).json({ ok: false, message: 'Fail to obtain codeforces user information' });
    }
}
