import { IPlatform } from "./platform.d";


export interface IContest {
    id: string;
    link: string;
    name: string;
    platform: IPlatform;
    type: string;
    durationSeconds: string;
    startTimeSeconds: string;
}