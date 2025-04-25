import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppTools } from "./tools/app";

import { DOMcpServer } from "./DOMcpServer";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import logger from "./logger";

export function createServer(): McpServer {
  const server = new DOMcpServer({
    name: "DigitalOcean MCP Server",
    version: "0.1.0",
  });

  registerAppTools(server);
  return server;
}

export function startStdioServer(server: McpServer) {
  const transport = new StdioServerTransport();
  return server.connect(transport).then(() => {
    logger.info("DigitalOcean MCP Server started ...");
  });
}
