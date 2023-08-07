import { Platform } from "./platform.d";


export interface IContest {
    id: string;
    link: string;
    name: string;
    platform: Platform;
    type: string;
    durationSeconds: string;
    startTimeSeconds: string;
}