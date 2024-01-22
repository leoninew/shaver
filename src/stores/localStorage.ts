import { defineStore } from "pinia";

export const useLocalStore = defineStore('localStorage', () => {
    const get = function (key: string) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    };

    const set = function (key: string, value: any) {
        const present = value !== undefined && value !== null;
        present ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.removeItem(key);
    };

    const assign = function (key: string, func: (value: any) => any) {
        const value = get(key);
        const present = value !== undefined && value !== null;
        present && func(value);
    }

    return { get, set, assign };

});