import {
  McpServer,
  ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { ServerOptions } from "@modelcontextprotocol/sdk/server/index.js";
import { ZodRawShape } from "zod";
import { Implementation } from "@modelcontextprotocol/sdk/types.js";

export type ToolArgs<Args extends undefined | ZodRawShape = undefined> = {
  name: string;
  description: string;
  parameters?: Args;
  cb: ToolCallback<Args>;
};

export class DOMcpServer extends McpServer {
  constructor(serverInfo: Implementation, options?: ServerOptions) {
    super(serverInfo, options);
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
