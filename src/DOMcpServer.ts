import {
  McpServer,
  ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { ZodRawShape } from "zod";

export type ToolArgs<Args extends undefined | ZodRawShape = undefined> = {
  name: string;
  description: string;
  parameters?: Args;
  cb: ToolCallback<Args>;
};

export class DOMcpServer extends McpServer {
  constructor(options: { name: string; version: string }) {
    super(options);
  }

  public registerTool<Args extends ZodRawShape | undefined = undefined>({
    name,
    description,
    parameters,
    cb,
  }: ToolArgs<Args>) {
    if (parameters) {
      this.tool(name, description, parameters, cb);
    } else {
      this.tool(name, description, cb as ToolCallback<undefined>);
    }
  }
}
