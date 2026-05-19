import { setup as setupServer } from "jest-dev-server";
import fs from "fs";
import os from "os";
import path from "path";
import https from "https";
import config from "../../config.json";
import { findAvailablePort } from "./portUtils";

function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}. Status code: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(destination);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });

        fileStream.on("error", reject);
      })
      .on("error", reject);
  });
}

// noinspection JSUnusedGlobalSymbols
export default async () => {
  // Get an available port, preferring 4010 but falling back to alternatives
  const port = await findAvailablePort([4010, 4011, 4012, 4013, 4014]);

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "prism-spec-"));
  const tempSpecPath = path.join(tempDir, "public-contract-definition.yaml");

  await downloadFile(config.openApiUrl, tempSpecPath);

  const servers = await setupServer({
    command: `npx prism mock "${tempSpecPath}" -p ${port}`,
    port: port,
    launchTimeout: 60000,
    usedPortAction: "kill"
  });

  const serverData = {
    port,
    tempDir,
    tempSpecPath,
    servers: servers.map(server => ({
      pid: server.pid
    }))
  };

  fs.writeFileSync(path.join(__dirname, "server-metadata.json"), JSON.stringify(serverData));
};
