export interface User {
    [key: string]: any;
    _id: string;
    name: string;
    imgUrl?: string;
    // labels?: Array<{
    //     id: string;
    //     name: string;
    //     color?: string;
    // }>;
}
