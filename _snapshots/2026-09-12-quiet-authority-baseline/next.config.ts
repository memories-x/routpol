import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Plesk Node.js: `node .next/standalone/server.js` (PORT from Plesk)
  output: "standalone",
  turbopack: {
    root,
  },
  // Keep project AGENTS.md (AI agent team); do not let Next overwrite it
  agentRules: false,
};

export default nextConfig;
