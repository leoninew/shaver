import { defineStore } from "pinia";

export const useSessionStore = defineStore('sessionStorage', () => {
    const get = function (key: string) {
        let value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    };

    const set = function (key: string, value: any) {
        const present = value !== undefined && value !== null;
        present ? sessionStorage.setItem(key, JSON.stringify(value)) : sessionStorage.removeItem(key);
    };

    const assign = function (key: string, func: (value: any) => any) {
        const value = get(key);
        const present = value !== undefined && value !== null;
        present && func(value);
    }

    return { get, set, assign };

});