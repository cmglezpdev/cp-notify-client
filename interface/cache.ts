
export interface ICache {
    set: (key: string, value: any) => void;
    get<T>(key: string): T | null;
}

