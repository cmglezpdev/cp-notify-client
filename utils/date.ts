import dayjs from "dayjs";


const initialformatDateSetting = {
    dayOfWeek: false,
    hour: true
}
export const formatDate = (dateTime: number, settings = initialformatDateSetting): string => {
    const { dayOfWeek, hour } = settings;
    let format = 'MMM/DD/YYYY';
    if (dayOfWeek) format = 'dddd ' + format;
    if (hour) format += ', HH:mm';

    return dayjs(dateTime).format(format)
}


export const formatDurationHours = (duration: number): string => {
    const hour = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - 3600 * hour) / 60);
    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

export const formatDurationMinutes = (duration: number): string => {
    return `${duration / 60}`;
}


export const getTimeFromDate = (dateTime: number): string => {
    return dayjs(dateTime).format('HH:mm')
}

export const addSecondsToDate = (dateTime: number, seconds: number): string => {
    return dayjs(dateTime).add(seconds, 'seconds').format('HH:mm')
}

export const timeToSeconds = (duration: string): number => {
    const [hours, minutes] = duration.split(":");
    const totalSeconds = (parseInt(hours) * 60 + parseInt(minutes)) * 60;
    return totalSeconds;
}

export const parseDate = (dateString: string): Date => {
    // 2023-06-24(Sat) 08:00
    const regex = /^(\d{4})-(\d{2})-(\d{2})\(([a-zA-Z]{3})\)\s(\d{2}):(\d{2})$/;
    const match = dateString.match(regex);

    if (match) {
        const year = parseInt(match[1]);
        const month = parseInt(match[2]) - 1;
        const day = parseInt(match[3]);
        const hour = parseInt(match[5]);
        const minute = parseInt(match[6]);

        return new Date(year, month, day, hour, minute);
    } else {
        throw new Error('Invalid Date');
    }
}
