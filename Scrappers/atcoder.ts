import { chromium } from 'playwright';
import { IContest, Platform } from '@/interface';
import { parseDate, timeToSeconds } from "@/utils";

interface Contest {
    name:        string;
    link:        string;
    type:        string;
    start:       string;
    duration:    string;
    ratedRange:  string;
}
  
export const scrapAtCoder = async () : Promise<IContest[]> => {
    const browser = await chromium.launch();

    const page = await browser.newPage();
    await page.goto("https://atcoder.jp/contests");
    const tableUpcoming = await page.$("#contest-table-upcoming tbody");
    const contestInfo = await tableUpcoming?.$$("tr");

    const contests : Contest[] = [];

    if(contestInfo) {
        for(const contest of contestInfo) {
            const items = await contest.$$("td");
            const start = await items[0].textContent();
            const duration = await items[2].textContent();
            const ratedRange = await items[3].textContent();
            
            const a = await items[1].$("a");
            const name = await a!.textContent();
            const link = "https://atcoder.jp" + (await a!.getAttribute("href"));
            const classType = await (await items[1].$$("span"))[1].getAttribute("class");
            const type = classType!.endsWith("blue") ? "ABC" : classType!.endsWith("orange") ? "ARC" : "AGC";

            contests.push({start: start!, name: name!, duration: duration!, ratedRange: ratedRange!, link, type});
        }
    }

    const generalContest : IContest[] = contests.map((contest, i) => {
        const { name, start, duration, link, type } = contest;
        const id = i + 1;
        const platform: Platform = 'ATCODER';
        const durationSeconds = timeToSeconds(duration);
        const startTimeSeconds = parseDate(start).getTime();

        return {id, name, platform, durationSeconds, startTimeSeconds, link, type};
    })
    
    await browser.close();
    return generalContest;
}