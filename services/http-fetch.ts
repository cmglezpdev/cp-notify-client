interface ApiSettings {
    baseUrl?: string;
}

abstract class HttpFetchService {
    settings: ApiSettings;

    constructor(settings: ApiSettings = {}) {
        this.settings = settings;
    }

    async get<T>(link: string): Promise<T> {
        throw new Error('The method GET not implement yet.')
    }

    async post<T>(link: string, body?: any): Promise<T> {
        throw new Error('The method POST not implement yet.')
    }
    async put<T>(link: string, body?: any): Promise<T> {
        throw new Error('The method PUT not implement yet.')
    }
    async delete<T>(link: string, body?: any): Promise<T> {
        throw new Error('The method DELET not implement yet.')
    }
}

export class HttpServiceImplementation extends HttpFetchService {
    constructor(settings: ApiSettings = {}) {
        super(settings);
    }

    async get<T>(link: string): Promise<T> {
        console.log(`${this.settings.baseUrl || ''}${link}`);
        const response = await fetch(`${this.settings.baseUrl || ''}${link}`);
        return await response.json();
    }
    async post<T>(link: string, body?: any): Promise<T> {
        const response = await fetch(`${this.settings.baseUrl || ''}${link}`, {
            body,
            method: 'POST'
        });
        return await response.json();
    }
    async put<T>(link: string, body?: any): Promise<T> {
        const response = await fetch(`${this.settings.baseUrl || ''}${link}`, {
            body,
            method: 'PUT'
        });
        return await response.json();
    }
    async delete<T>(link: string, body?: any): Promise<T> {
        const response = await fetch(`${this.settings.baseUrl || ''}${link}`, {
            body,
            method: 'DELETE'
        });
        return await response.json();
    }
}

export const httpService = new HttpServiceImplementation({
    baseUrl: process.env.HOST_API
})