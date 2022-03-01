import colors from 'colors/safe';
import { AxiosError } from 'axios';
import { debug } from ':config';


const axiosErrorToJSON = (err: AxiosError) => ({
  isAxiosError: true,
  request: {
    method: err.config.method,
    url: err.config.url,
    query: err.config.params,
    body: err.config.data,
    authorizationHeader: err.config.headers?.authorization || err.config.headers?.Authorization,
  },
  response: {
    status: err.response.status,
    statusText: err.response.statusText,
    body: err.response.data,
  },
});

const logsStringify = (logs: unknown[]) => logs.map((log) => {
  try {
    if ((log as AxiosError).isAxiosError) {
      if (debug) return axiosErrorToJSON(log as AxiosError);
      return JSON.stringify(axiosErrorToJSON(log as AxiosError));
    }
    if (log instanceof Error || debug) return log;
    if (typeof log === 'object') return JSON.stringify(log);
    if (typeof log === 'string') return log.split('\n').join(' ');
    return log;
  } catch (err) {
    return log;
  }
});

interface Logger {
  debug: ((...logs: unknown[]) => void) | (() => void);
  info: (...logs: unknown[]) => void;
  warn: (...logs: unknown[]) => void;
  error: (...logs: unknown[]) => void;
}

export function createLogger(tag = ''): Logger {
  const DEBUG = colors.rainbow('DEBUG') + colors.blue(tag ? ` (${tag}):` : ':');
  const INFO = colors.blue(`INFO${tag ? ` (${tag})` : ''}:`);
  const WARN = colors.yellow(`WARN${tag ? ` (${tag})` : ''}:`);
  const ERR = colors.red(`ERROR${tag ? ` (${tag})` : ''}:`);

  /* eslint-disable no-console */
  return {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
    debug: debug ? (...logs: unknown[]) => console.debug(DEBUG, ...logsStringify(logs)) : () => {},
    info: (...logs: unknown[]) => console.info(INFO, ...logsStringify(logs)),
    warn: (...logs: unknown[]) => console.warn(WARN, ...logsStringify(logs)),
    error: (...logs: unknown[]) => console.error(ERR, ...logsStringify(logs)),
  };
  /* eslint-enable no-console */
}

export default createLogger();
