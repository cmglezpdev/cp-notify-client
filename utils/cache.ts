import { ICache } from '@/interface';

export class MemoryCache implements ICache {
    cache: {[key: string] : any} = {};
    
    set (key: string, value: any): void {
        this.cache[key] = value;
    }
    
    get<T>(key: string): T | null {
        const value = this.cache[key];
        if(value == undefined) return null;
        return value as T;
    }
}


// class CacheFabric<ICache> {
//     private instance: ICache | null = null;
//     private constructor () {}

//     public getInstance(): ICache {
//         if(this.instance == null)
//             this.instance;
//         return this.instance; 
//     }
// }