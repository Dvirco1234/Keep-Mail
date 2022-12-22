// import { NoteImgAudio } from './';
import { NoteTodo } from './';
import { NoteTxt } from './';

export class Note {
    constructor(
        public type: string,
        public info: NoteTodo | NoteTxt,
        public media: { type: string; url: string } | null = {
            type: '',
            url: '',
        },
        // public content: NoteTodo | NoteTxt,
        public _id: string = '',
        public isPinned: boolean = false,
        public labels: Array<{
            title: string;
            color: string;
        }> = [],
        public style: { backgroundColor: string } = { backgroundColor: 'fff' }
    ) {}

    setId?(id: string = 'n101') {
        this._id = id;
    }
}

// export interface Note {
//     _id: string;
//     type: string;
//     isPinned: boolean;
//     info: NoteImgAudio | NoteTodo | NoteTxt;
//     labels: Array<{
//         title: string;
//         color: string;
//     }> | null;
//     style: { backgroundColor: string };
// }
