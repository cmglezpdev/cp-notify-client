
const ACCESS_TOKEN_KEY = '__access_token__';

const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

const setToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export const accessToken = {
    getToken,
    setToken
}
