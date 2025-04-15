// __tests__/integration/serverTeardown.ts
import { teardown as teardownServer } from "jest-dev-server";
import fs from "fs";
import path from "path";

// noinspection JSUnusedGlobalSymbols
export default async () => {
  try {
    // Read server metadata
    const rawData = fs.readFileSync(path.join(__dirname, "server-metadata.json"), "utf-8");

    const servers = JSON.parse(rawData).map((server: { pid: number }) => ({
      pid: server.pid,
      destroy: () => process.kill(server.pid)
    }));

    // Proper teardown with original server instances
    await teardownServer(servers);
  } catch (error) {
    console.error("Teardown error:", error);
  } finally {
    // Cleanup metadata file
    if (fs.existsSync(path.join(__dirname, "server-metadata.json"))) {
      fs.unlinkSync(path.join(__dirname, "server-metadata.json"));
    }
  }
};
