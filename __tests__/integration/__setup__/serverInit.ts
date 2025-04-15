import { setup as setupServer } from "jest-dev-server";
import fs from "fs";
import path from "path";
import config from "../../config.json";

// noinspection JSUnusedGlobalSymbols
export default async () => {
  const servers = await setupServer({
    command: `npx prism mock ${config.openApiUrl} -p 8000`,
    port: 8000,
    launchTimeout: 60000,
    usedPortAction: "kill"
  });

  // Save server metadata including child process PID
  const serverData = servers.map(server => ({
    pid: server.pid
  }));

  fs.writeFileSync(path.join(__dirname, "server-metadata.json"), JSON.stringify(serverData));
};
