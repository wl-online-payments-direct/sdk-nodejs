import { setup as setupServer } from "jest-dev-server";
import fs from "fs";
import path from "path";
import config from "../../config.json";
import { findAvailablePort } from "./portUtils";

// noinspection JSUnusedGlobalSymbols
export default async () => {
  // Get an available port, preferring 4010 but falling back to alternatives
  const port = await findAvailablePort([4010, 4011, 4012, 4013, 4014]);

  const servers = await setupServer({
    command: `npx prism mock ${config.openApiUrl} -p ${port}`,
    port: port,
    launchTimeout: 60000,
    usedPortAction: "kill"
  });

  const serverData = {
    port,
    servers: servers.map(server => ({
      pid: server.pid
    }))
  };

  fs.writeFileSync(path.join(__dirname, "server-metadata.json"), JSON.stringify(serverData));
};
