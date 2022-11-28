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
