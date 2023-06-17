import { TodoItemEntity } from "@/universal/todo";

export interface ElectronAPI {
    fetchTodoItem: () => Promise<TodoItemEntity[]>;
    completeTodoItem: (id: number) => Promise<boolean>;
    removeTodoItem: (id: number) => Promise<boolean>;
    updateTodoItem: (todoItemEntityStr: stirng) => Promise<boolean>;
    addTodoItem: (todoItemEntityStr: stirng) => Promise<boolean>;
}

declare global {
    interface Window {
        api: ElectronAPI;
    }
}
