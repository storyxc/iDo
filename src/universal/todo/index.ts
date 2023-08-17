interface TodoItemEntity {
    id: number,
    title: string;
    remark: string;
    tags: string[];
    flag: boolean;
    completed: boolean,
    completedAt: string;
}

interface TodoList {
    data: TodoItemEntity[];
}

interface Preferences {
    startAtLogin: boolean;
    updateFrequency: string;
}

export type { TodoItemEntity, TodoList, Preferences };
