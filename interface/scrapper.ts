import { IContest } from "./generalContest";
import { IUser } from "./user";


export interface IScrapper {
    getContests: () => Promise<IContest[] | null>;
    getProfile: (handle: string) => Promise<IUser | null>;
}
