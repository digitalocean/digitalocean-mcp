import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppTools } from "./tools/app";
import { DOMcpServer } from "./DOMcpServer";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import logger from "./logger";
import pkg from "../package.json";
import { subscribe } from "diagnostics_channel";

export function createServer(): McpServer {
  const server = new DOMcpServer(
    {
      name: "DigitalOcean MCP Server",
      version: "1.0.0",
    },
    { capabilities: { logging: { subscribe: true } } }
  );

  logger.createStdioLogger(server);
  registerAppTools(server);
  return server;
}

export function startStdioServer(server: McpServer) {
  const transport = new StdioServerTransport();

  return server.connect(transport).then(() => {
    logger.info(`DigitalOcean MCP Server v${pkg.version} started`);
  });
}
