const logger = {
  info: (...args: any[]) => {
    console.log(...args);
  },
  error: (...args: any[]) => {
    console.error(...args);
  },
  debug: (...args: any[]) => {
    console.debug(...args);
  },
};

export default logger;
