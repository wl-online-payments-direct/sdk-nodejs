// __tests__/integration/serverTeardown.ts
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// noinspection JSUnusedGlobalSymbols
export default async () => {
  let teardownError: unknown = null;
  const metadataPath = path.join(__dirname, "server-metadata.json");

  try {
    // Read server metadata
    const rawData = fs.readFileSync(metadataPath, "utf-8");
    const metadata = JSON.parse(rawData) as { port: number; servers: { pid: number }[] };

    // Kill each server process directly
    for (const server of metadata.servers) {
      try {
        if (process.platform === "win32") {
          // On Windows, use taskkill for forceful termination
          execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: "ignore" });
        } else {
          // On Unix, use SIGKILL for forceful termination
          process.kill(server.pid, "SIGKILL");
        }
      } catch (error) {
        // Process may already be dead, ignore errors
        const code = (error as NodeJS.ErrnoException).code;
        if (code !== "ESRCH" && code !== "EPERM") {
          // Only ignore "no such process" and "operation not permitted" errors
          console.error(`Failed to kill process ${server.pid}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Teardown error:", error);
    teardownError = error;
  } finally {
    // Cleanup metadata file
    if (fs.existsSync(metadataPath)) {
      fs.unlinkSync(metadataPath);
    }
  }

  // Rethrow after cleanup to fail the test run
  if (teardownError) {
    throw teardownError;
  }
};
