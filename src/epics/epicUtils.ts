import { API_CONST } from "../config";

export function getApiUrl(api: string) {
    return API_CONST.url + api;
}