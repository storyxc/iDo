import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron([
            {
                entry: "electron/main.ts",
            },
            {
                entry: "electron/preload.ts",
                onstart(options) {
                    // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
                    // instead of restarting the entire Electron App.
                    options.reload();
                },
            },
        ]),
        AutoImport({
            imports: ["vue"],
            resolvers: [ElementPlusResolver()],
            dts: "./auto-imports.d.ts",
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: "./components.d.ts",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
});
