//! Platforms
export interface ApiPlatformResponse {
    platforms: Platform[];
    status: number;
}

export interface Platform {
    id: number;
    link: string;
    name: string;
}
