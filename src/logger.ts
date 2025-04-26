import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type LogLevel =
  | "alert"
  | "info"
  | "error"
  | "debug"
  | "notice"
  | "warning"
  | "critical"
  | "emergency";
interface LoggerOptions {
  server?: McpServer;
}

function toMessage(...args: [message?: any, ...optionalParams: any[]]): string {
  return args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
}

class Logger {
  private static instance: Logger | null = null;
  private server?: McpServer;

  private constructor(options: LoggerOptions = {}) {
    this.server = options.server;
  }

  public static createInstance(options: LoggerOptions = {}): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(options);
    }
    return Logger.instance;
  }

  private sendLoggingNotification(level: LogLevel, data: unknown): void {
    if (this.server) {
      this.server?.server.sendLoggingMessage({
        level,
        data: data,
      });
    } else {
      process.stdout.write(`${JSON.stringify({ level, data })}\n`);
    }
  }

  public info(...args: any[]): void {
    this.sendLoggingNotification("info", toMessage(...args));
  }

  public error(...args: any[]): void {
    this.sendLoggingNotification("error", toMessage(...args));
  }

  public warn(...args: any[]): void {
    this.sendLoggingNotification("warning", toMessage(...args));
  }

  public debug(...args: any[]): void {
    this.sendLoggingNotification("debug", toMessage(...args));
  }

  public createStdioLogger(server: McpServer): void {
    this.server = server;
  }
}

export default Logger.createInstance();
