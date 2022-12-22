import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}
    save(key: string, value: any) {
        localStorage[key] = JSON.stringify(value);
    }

    load(key: string, defaultValue = null) {
        var value = localStorage[key] || defaultValue;
        return JSON.parse(value);
    }
}
