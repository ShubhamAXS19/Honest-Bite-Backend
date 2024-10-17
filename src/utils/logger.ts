import pino from "pino"; // Changed from 'logger' to 'pino'
import dayjs from "dayjs";

const level = "info";

const log = pino({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
