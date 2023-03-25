import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// npm i -D @types/node
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // for absolute imports [ step - 1 ]
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
});
