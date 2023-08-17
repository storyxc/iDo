import { Preferences, TodoItemEntity } from "@/universal/todo";
import { ipcMain, app } from "electron";
import fs from "fs";
import path from "path";


export default {
    startListen: () => {
        const pathElement = app.getPath("userData")
        const todoFilePath = path.join(pathElement, "todo.json");
        const preferencesFilePath = path.join(pathElement, "preferences.json");
        /**
         * @description 拉取待办事项列表数据
         */
        ipcMain.handle("FETCH-TODO-ITEM", async (): Promise<TodoItemEntity[]> => {
            if (fs.existsSync(todoFilePath)) {
                return fetchTodoDataFromLocal(todoFilePath);
            } else {
                fs.writeFileSync(todoFilePath, JSON.stringify([]));
                return [];
            }
        });

        /**
         * @description 完成待办事项
         */
        ipcMain.handle("COMPLETE-TODO-ITEM", async (event, id: number): Promise<boolean> => {
            let todoItemEntities = fetchAllDataFromLocal(todoFilePath);
            for (const todoItemEntity of todoItemEntities) {
                if (todoItemEntity.id === id) {
                    todoItemEntity.completed = true;
                    todoItemEntity.completedAt = formatDate(new Date())
                    // 更新本地数据
                    fs.writeFileSync(todoFilePath, JSON.stringify(todoItemEntities));
                    return true;
                }
            }
            return false;
        })

        /**
         * @description 添加待办事项
         */
        ipcMain.handle("ADD-TODO-ITEM", async (event, todoItemStr: string): Promise<boolean> => {
                const todoItem = JSON.parse(todoItemStr) as TodoItemEntity;
                const todoItemEntities = fetchAllDataFromLocal(todoFilePath);
                let number;
                if (todoItemEntities.length === 0) {
                    number = 0;
                } else {
                    // 获取最大的id
                    number = todoItemEntities.map((item) => item.id).reduce((pre, cur) => {
                        return pre > cur ? pre : cur;
                    });
                }
                todoItem.id = number + 1;
                todoItemEntities.push(todoItem);
                // 更新本地数据
                fs.writeFileSync(todoFilePath, JSON.stringify(todoItemEntities));
                return true;
            }
        );

        /**
         * @description 删除待办事项
         */
        ipcMain.handle("REMOVE-TODO-ITEM", async (event, id: number): Promise<boolean> => {
            let todoItemEntities = fetchAllDataFromLocal(todoFilePath);
            for (const todoItemEntity of todoItemEntities) {
                if (todoItemEntity.id === id) {
                    // 根据id删除
                    todoItemEntities = todoItemEntities.filter((item) => item.id !== id);
                    // 更新本地数据
                    fs.writeFileSync(todoFilePath, JSON.stringify(todoItemEntities));
                    return true;
                }
            }
            return false;
        });


        /**
         * @description 修改待办事项
         */
        ipcMain.handle("UPDATE-TODO-ITEM", async (event, todoItemStr: string): Promise<boolean> => {
            const todoItem = JSON.parse(todoItemStr) as TodoItemEntity;
            let todoItemEntities = fetchAllDataFromLocal(todoFilePath);
            for (const todoItemEntity of todoItemEntities) {
                if (todoItemEntity.id === todoItem.id) {
                    // 根据id修改
                    todoItemEntities = todoItemEntities.map((item) => {
                        if (item.id === todoItem.id) {
                            return todoItem;
                        }
                        return item;
                    });
                    // 更新本地数据
                    fs.writeFileSync(todoFilePath, JSON.stringify(todoItemEntities));
                    return true;
                }
            }
            return false;
        });

        /**
         * @description 获取偏好设置
         */
        ipcMain.handle("GET-PREFERENCES", async (): Promise<Preferences> => {
            if (fs.existsSync(preferencesFilePath)) {
                const preferences = fs.readFileSync(preferencesFilePath, "utf-8");
                return JSON.parse(preferences);
            } else {
                const defaultPreferences = {
                    startAtLogin: false,
                    updateFrequency: 'Never',
                };
                fs.writeFileSync(preferencesFilePath, JSON.stringify(defaultPreferences));
                return defaultPreferences;
            }
        });

        /**
         * @description 切换开机自启动
         */
        ipcMain.handle("TOGGLE-AUTO-LAUNCH", async (event, enabled: boolean): Promise<boolean> => {
            app.setLoginItemSettings({
                openAtLogin: enabled,
                openAsHidden: true,
            });

            const preferences = fs.readFileSync(preferencesFilePath, "utf-8");
            const preferencesObj = JSON.parse(preferences);
            preferencesObj.startAtLogin = enabled;
            fs.writeFileSync(preferencesFilePath, JSON.stringify(preferencesObj));
            return true;
        });
    },

}

/**
 * @description 拉取所有的待办事项列表数据
 * @param todoFilePath
 */
function fetchAllDataFromLocal(todoFilePath: string) {
    const todoData = fs.readFileSync(todoFilePath, "utf-8");
    if (!todoData) return [];
    const dataList: TodoItemEntity[] = JSON.parse(todoData);
    return dataList;
}

/**
 * @description 拉取未完成的待办事项列表数据
 * @param todoFilePath
 */
function fetchTodoDataFromLocal(todoFilePath: string) {
    const dataList = fetchAllDataFromLocal(todoFilePath);
    return dataList.filter((item) => !item.completed);
}

function formatDate(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const seconds: string = String(date.getSeconds()).padStart(2, '0');

    return `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }`;
}
