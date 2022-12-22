export interface NoteTodo {
    title: string;
    todos:
        | Array<{
              id: string;
              txt: string;
              isDone: boolean;
              doneAt: number | null;
          }>
        | [];
}
export interface NoteTxt {
    title: string;
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
