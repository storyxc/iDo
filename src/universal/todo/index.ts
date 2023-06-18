interface TodoItemEntity {
    id: number,
    title: string;
    remark: string;
    tags: string[];
    flag: boolean;
    completed: boolean;
}

interface TodoList {
    data: TodoItemEntity[];
}

interface Preferences {
    startAtLogin: boolean;
    updateFrequency: string;
}

const UpdateFrequency = {
    Never: "never",
    Daily: "daily",
    Weekly: "weekly",
    Manually: "manually",
}

export type { TodoItemEntity, TodoList, Preferences };
export { UpdateFrequency };
