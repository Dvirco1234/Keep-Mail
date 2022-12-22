import { Injectable } from '@angular/core';
import { map, of, pipe } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AsyncStorageService {
    constructor() {}

    public query(entityType: string, delay = 300) {
        const entity = localStorage.getItem(entityType);
        let entities = entity ? JSON.parse(entity) : [];

        // return setTimeout(() => {
        return of(entities);
        // }, delay);
    }

    public get(entityType: string, entityId: string) {
        return this.query(entityType).pipe(
            map((entities: any) =>
                entities.find((entity: any) => entity._id === entityId)
            )
        );
    }
    // ((entities: any) =>
    //     entities.find((entity: any) => entity._id === entityId)
    // );
    public post(entityType: string, newEntity: any) {
        newEntity._id = this._makeId();
        return this.query(entityType).pipe((entities: any) => {
            entities.push(newEntity);
            this._save(entityType, entities);
            return newEntity;
        });
    }

    public put(entityType: string, updatedEntity: any) {
        return this.query(entityType).pipe((entities: any) => {
            const idx = entities.findIndex(
                (entity: any) => entity._id === updatedEntity._id
            );
            entities.splice(idx, 1, updatedEntity);
            this._save(entityType, entities);
            return updatedEntity;
        });
    }

    // public remove(entityType: string, entityId: string) {
    //     return this.query(entityType).pipe((entities: any) => {
    //         const idx = entities.findIndex(
    //             (entity: any) => entity._id === entityId
    //         );
    //         entities.splice(idx, 1);
    //         this._save(entityType, entities);
    //     });
    // }

    private _save(entityType: string, entities: any[]) {
        localStorage.setItem(entityType, JSON.stringify(entities));
    }

    private _makeId(length = 5) {
        var text = '';
        var possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }
        return text;
    }

    public postMany(entityType: string, newEntities: any[]) {
        return this.query(entityType).pipe((entities: any) => {
            newEntities = newEntities.map((entity) => ({
                ...entity,
                _id: this._makeId(),
            }));
            entities.push(...newEntities);
            this._save(entityType, entities);
            return entities;
        });
    }
}
