/**
 * Plesk Node.js startup wrapper.
 * Application startup file: plesk-server.js
 * (Plesk sets PORT; Next standalone binds HOSTNAME 0.0.0.0)
 */
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

const { existsSync } = require("fs");
const { join } = require("path");

const standalone = join(__dirname, ".next", "standalone", "server.js");
if (!existsSync(standalone)) {
  console.error(
    "[plesk-server] .next/standalone/server.js missing. Run: npm run plesk:build",
  );
  process.exit(1);
}

require(standalone);
