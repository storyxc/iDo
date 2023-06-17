import { TodoItemEntity } from "@/universal/todo";

export interface ElectronAPI {
    fetchTodoItem: () => Promise<TodoItemEntity[]>;
    completeTodoItem: (id: number) => Promise<boolean>;
    removeTodoItem: (id: number) => Promise<boolean>;
    updateTodoItem: (todoItemEntityStr: string) => Promise<boolean>;
    addTodoItem: (todoItemEntityStr: string) => Promise<boolean>;
}