import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
    fetchTodoItem: () => ipcRenderer.invoke("FETCH-TODO-ITEM"),
    completeTodoItem: (id: number) => ipcRenderer.invoke("COMPLETE-TODO-ITEM", id),
    removeTodoItem: (id: number) => ipcRenderer.invoke("REMOVE-TODO-ITEM", id),
    updateTodoItem: (todoItemStr: string) => ipcRenderer.invoke("UPDATE-TODO-ITEM", todoItemStr),
    addTodoItem: (todoItemStr: string) => ipcRenderer.invoke("ADD-TODO-ITEM", todoItemStr),
});
