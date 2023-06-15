export interface User {
    [key: string]: any;
    _id: string;
    username: string;
    fullname: string;
    imgUrl?: string;
    // labels?: Array<{
    //     id: string;
    //     name: string;
    //     color?: string;
    // }>;
}
