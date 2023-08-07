import axios, { AxiosError } from "axios";

interface ApiSettings {
    baseUrl?: string;
}

abstract class HttpFetchService {
    settings: ApiSettings;

    constructor(settings: ApiSettings = {}) {
        this.settings = settings;
    }

    async get<T>(link: string, settings: any): Promise<T> {
        throw new Error('The method GET not implement yet.')
    }

    async post<T>(link: string, body?: any, settings?: any): Promise<T> {
        throw new Error('The method POST not implement yet.')
    }
    async put<T>(link: string, body?: any, settings?: any): Promise<T> {
        throw new Error('The method PUT not implement yet.')
    }
    async delete<T>(link: string, settings?: any): Promise<T> {
        throw new Error('The method DELET not implement yet.')
    }
}

export class HttpServiceImplementation extends HttpFetchService {
    constructor(settings: ApiSettings = {}) {
        super(settings);
    }

    async get<T>(link: string, settings: any = {}): Promise<T> {
        try {
            const { data } = await axios.get<T>(`${this.settings.baseUrl || ''}${link}`, {
                ...settings
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response!.data.message)
        }
    }
    async post<T>(link: string, body?: any, settings: any = {}): Promise<T> {
        try {
            const { data } = await axios.post<T>(`${this.settings.baseUrl || ''}${link}`, body, {
                ...settings
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response!.data.message)
        }
    }

    async put<T>(link: string, body?: any, settings: any = {}): Promise<T> {
        try {
            const { data } = await axios.put<T>(`${this.settings.baseUrl || ''}${link}`, body, {
                ...settings
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response!.data.message)
        }
    }

    async delete<T>(link: string, settings: any = {}): Promise<T> {
        try {
            const { data } = await axios.delete<T>(`${this.settings.baseUrl || ''}${link}`, {
                ...settings
            });

            return data;
        } catch (error: any) {
            throw new Error(error.response!.data.message)
        }
    }
}

export const httpService = new HttpServiceImplementation({
    baseUrl: process.env.NEXT_PUBLIC_HOST_API
})