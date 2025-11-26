import { createServer } from "net";

/**
 * Find an available port from a list of preferred ports
 */
export async function findAvailablePort(preferredPorts: number[]): Promise<number> {
  for (const port of preferredPorts) {
    const available = await new Promise<boolean>(resolve => {
      const server = createServer();
      server.once("error", () => resolve(false));
      server.once("listening", () => {
        server.close();
        resolve(true);
      });
      server.listen(port);
    });
    if (available) {
      return port;
    }
  }

  throw new Error(`No available port found from: ${preferredPorts.join(", ")}`);
}
