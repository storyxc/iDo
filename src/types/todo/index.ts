interface TodoItemEntity {
    title: string;
    remark: string;
    tags: string[];
    flag: boolean;
    completed: boolean;
}

interface TodoList {
    data: TodoItemEntity[];
}


export type { TodoItemEntity, TodoList };