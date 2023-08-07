
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

// TODO: Cambiar esto ahora por las cookies
// añadir el nombre a las constantes xq en el server no se puede usar el paquete de cookies