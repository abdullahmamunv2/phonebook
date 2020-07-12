import { ILogger } from "@core/logger";
import { injectable } from "@core/di";

import {getLogger, Logger} from 'log4js'

@injectable()
export default class DatabaseLogger implements ILogger{
    static logger : Logger  = getLogger('Database');

    isDebugEnabled(): boolean {
        return DatabaseLogger.logger.isDebugEnabled();
    }
    trace(...args: any[]): void {
        DatabaseLogger.logger.trace(args);
    }    
    debug(...args: any[]): void {
        DatabaseLogger.logger.debug(args);
    }
    info(...args: any[]): void {
        DatabaseLogger.logger.info(args);
    }
    warn(...args: any[]): void {
        DatabaseLogger.logger.warn(args);
    }
    error(...args: any[]): void {
        DatabaseLogger.logger.error(args);
    }
    fatal(...args: any[]): void {
        DatabaseLogger.logger.fatal(args);
    }


}