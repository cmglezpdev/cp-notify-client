import { IContest } from "./generalContest";
import { IUser } from "./user";


export interface IScrapper {
    getContests: () => Promise<IContest[]>;
    getProfile: (handle: string) => Promise<IUser | null>;
}
