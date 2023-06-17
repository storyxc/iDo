import { ElectronAPI } from "@/universal/electron";

declare global {
    interface Window {
        api: ElectronAPI;
    }
}
