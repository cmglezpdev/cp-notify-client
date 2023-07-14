import axios from "axios";

export const baseApi = axios.create({
    baseURL: process.env.HOST_API
});