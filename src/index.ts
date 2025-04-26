#!/usr/bin/env node

import logger from "./logger";
import { createServer, startStdioServer } from "./server";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const server = createServer();
  startStdioServer(server);
}

main().catch((error) => {
  logger.error("Error starting server:", error.message);
  process.exit(1);
});
