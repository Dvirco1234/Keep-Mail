import { NoteImgAudio } from './note-info/note-img-audio';
import { NoteTodo } from './note-info/note-todo';
import { NoteTxt } from './note-info/note-txt';

export interface Note {
    _id: string;
    type: string;
    isPinned: boolean;
    info: NoteImgAudio | NoteTodo | NoteTxt;
    labels: Array<{
        title: string;
        color: string;
    }> | null;
    style: { backgroundColor: string };
}
