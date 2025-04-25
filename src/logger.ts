interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
}

function toMessage(...args: Parameters<typeof console.error>): string {
  return args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
}

const logger = {
  info: (...args: any[]) => {
    const entry: LogEntry = {
      level: "info",
      message: toMessage(...args),
      timestamp: new Date().toISOString(),
    };
    process.stdout.write(`${JSON.stringify(entry)}\n`);
  },
  error: (...args: any[]) => {
    const entry: LogEntry = {
      level: "error",
      message: toMessage(...args),
      timestamp: new Date().toISOString(),
    };
    process.stderr.write(`${JSON.stringify(entry)}\n`);
  },
  warn: (...args: any[]) => {
    const entry: LogEntry = {
      level: "warn",
      message: toMessage(...args),
      timestamp: new Date().toISOString(),
    };
    process.stderr.write(`${JSON.stringify(entry)}\n`);
  },
  debug: (...args: any[]) => {
    const entry: LogEntry = {
      level: "debug",
      message: toMessage(...args),
      timestamp: new Date().toISOString(),
    };
    process.stdout.write(`${JSON.stringify(entry)}\n`);
  },
};

export default logger;
