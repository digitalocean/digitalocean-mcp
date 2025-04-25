interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
}

function logMessage(entry: LogEntry) {
  process.stderr.write(`${JSON.stringify(entry)}\n`);
}

function toMessage(...args: Parameters<typeof console.error>): string {
  return args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
}

const logger = {
  info: (...args: any[]) => {
    logMessage({
      level: "info",
      message: toMessage(...args),
      timestamp: new Date().toISOString(),
    });
  },
  error: (...args: any[]) => {
    logMessage({
      level: "error",
      message: toMessage(...args),
      timestamp: new Date().toISOString(),
    });
  },
  debug: (...args: any[]) => {
    logMessage({
      level: "debug",
      message: toMessage(...args),
      timestamp: new Date().toISOString(),
    });
  },
};

export default logger;
