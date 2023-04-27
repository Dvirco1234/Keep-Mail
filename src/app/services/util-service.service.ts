import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    constructor() {}
    // save(key: string, value: any) {
    //     localStorage[key] = JSON.stringify(value);
    // }

    // load(key: string, defaultValue = null) {
    //     var value = localStorage[key] || defaultValue;
    //     return JSON.parse(value);
    // }

    public save(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public load(key: string) {
        let val: string | null = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
    }

    public makeId(length = 6) {
        var txt = '';
        var possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return txt;
    }

    public isDarkImg(imageUrl: string): Promise<boolean> {
        // Create an image element
        return new Promise((resolve) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            // Set the image src to the provided URL
            image.src = imageUrl;
            // let result: boolean = false;
            image.onload = (): void => {
                // Create a canvas element
                const canvas = document.createElement('canvas');

                // Set the canvas width and height to the same as the image
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image on the canvas
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(image, 0, 0);
                const imageData = ctx?.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                // Get the image data from the canvas

                // Calculate the average color of the image by getting the average value of the R, G, and B channels
                const averageColor = imageData
                    ? imageData.data.reduce((acc, val) => acc + val, 0) /
                      imageData.data.length /
                      255
                    : 1;

                // Return true if the average color is less than 0.5 (dark), or false if it is greater than or equal to 0.5 (light)
                resolve(averageColor < 0.5);
                // return averageColor < 0.5;
            };
            // return result || false;
        });
    }
}
