// import { NoteImgAudio } from './';
import { NoteInfo, NoteTodo } from './';
import { NoteTxt } from './';

// export class Note {
//     constructor(
//         public type: string,
//         // public info: NoteInfo,
//         public info: NoteTodo | NoteTxt,
//         public media: { type: string; url: string } | null = {
//             type: '',
//             url: '',
//         },
//         // public content: NoteTodo | NoteTxt,
//         public _id: string = '',
//         public isPinned: boolean = false,
//         public labels: Array<{
//             title: string;
//             color: string;
//         }> = [],
//         public style: { backgroundColor: string } = { backgroundColor: 'fff' }
//     ) {}

//     setId?(id: string = 'n1001') {
//         this._id = id;
//     }
// }

export interface Note {
    _id: string;
    type: string;
    isPinned: boolean;
    media: { type: string; url: string } | null;
    info: NoteTodo | NoteTxt;
    labels: Array<{
        id: string;
        name: string;
        color?: string;
    }>;
    style: { backgroundColor: string, backgroundImg?: string };
    deletedAt?: number | Date;
    lastEditedAt?: number | Date;
    isArchived?: boolean;
    [key: string]: any; // Index signature
}
export interface NoteInt {
    [key: string]:
        | boolean
        | string
        | NoteTodo
        | NoteTxt
        | Array<{
              title: string;
              color: string;
          }>
        | null
        | { backgroundColor?: string, backgroundImg?: string };
}
