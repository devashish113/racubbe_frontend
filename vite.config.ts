import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
    tanstackStart: {
        // Redirect TanStack Start's bundled server entry to src/server.ts
        server: { entry: "server" },
    },
    vite: {
        plugins: [
            // Explicitly run Nitro build to generate the .output/ directory for production Node.js deployment
            nitro({
                preset: "node-server",
            }),
        ],
    },
});
