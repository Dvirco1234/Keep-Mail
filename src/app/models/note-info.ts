export interface NoteTodo {
    title: string;
    todos:
        | Array<{
              id: string;
              txt: string;
              isDone?: boolean; //no need
              doneAt: number | null;
          }>
        | [];
    txt?: string;
}
export interface NoteTxt {
    title: string;
    txt: string;
    todos?: [];
}
export interface Todo {
    id: string;
    txt: string;
    isDone?: boolean; //no need
    doneAt: number | null;
}
export interface NoteInfo {
    title: string;
    todos:
        | Array<{
              id: string;
              txt: string;
              isDone?: boolean; //no need
              doneAt: number | null;
          }>
        | [];
    txt: string;
}
// export interface NoteAudio {
//     title?: string;
//     url: string;
// }
// export interface NoteInfo {
//     title: string;
//     txt: string;
//     imgUrl?: string;
//     audioUrl?: string;
// }
// export interface NoteVideo {
//     title?: string;
//     videoId: string;
// }
