import { create } from "zustand";
import Cookies from "js-cookie";

import { httpService, validate } from "@/services";
import { constants } from "../utils/constants";
import { ISignInApiRequest, ISignInApiResponse } from "@/types/auth";
import { IUser } from "@/types/user";

type AuthState = {
    user?: IUser;
    token?: string;
}

type AuthAction = {
    loadState: () => void;
    signIn: (credentials: ISignInApiRequest) => Promise<void>;
    // signUp: ()
    signOut: () => void;
}


export const useAuthStore = create<AuthState & AuthAction>((set) => ({
    user: undefined,
    token: undefined,

    loadState: () => {
        const user = Cookies.get('__USER__');
        const token = Cookies.get('__ACCESS_TOKEN__');
        if (!user || !token) return;
        set(state => ({ ...state, user: JSON.parse(user), token }))
    },
    signIn: async (credentials: ISignInApiRequest): Promise<void> => {
        validate.signIn(credentials);
        const { token, user } = await httpService.post<ISignInApiResponse>(constants.API_SIGNIN, credentials);
        Cookies.set('__USER__', JSON.stringify(user))
        Cookies.set('__ACCESS_TOKEN__', token);
        set(state => ({ ...state, user, token }))
    },
    signOut: () => set(state => ({ ...state, user: undefined, token: undefined })),
}))