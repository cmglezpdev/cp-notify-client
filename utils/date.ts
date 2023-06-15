
export const formatDate = (dateTime: string | number) : string => {
    const date = new Date(dateTime);    
    const day = (date.getDay() >= 10) ? date.getDay() : `0${date.getDay()}`;
    const month = (date.getMonth() + 1 >= 10) ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = (date.getFullYear() >= 10) ? date.getFullYear() : `0${date.getFullYear()}`;
    const hour = (date.getHours() >= 10) ? date.getHours() : `0${date.getHours()}`;
    const minutes = (date.getMinutes() >= 10) ? date.getMinutes() : `0${date.getMinutes()}`;

    return `${day}/${month}/${year}, ${hour}:${minutes}`;
}


export const formatDuration = (duration: number) : string => {
    const hour = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - 3600 * hour) / 60);
    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
}