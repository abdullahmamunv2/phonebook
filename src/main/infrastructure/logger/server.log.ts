import { ILogger } from "@core/logger";
import { injectable } from "@core/di";

import {getLogger, Logger} from 'log4js'

@injectable()
export default class ServerLogger implements ILogger{
    static logger : Logger  = getLogger('Database');

    isDebugEnabled(): boolean {
        return ServerLogger.logger.isDebugEnabled();
    }
    trace(...args: any[]): void {
        ServerLogger.logger.trace(args);
    }    
    debug(...args: any[]): void {
        ServerLogger.logger.debug(args);
    }
    info(...args: any[]): void {
        ServerLogger.logger.info(args);
    }
    warn(...args: any[]): void {
        ServerLogger.logger.warn(args);
    }
    error(...args: any[]): void {
        ServerLogger.logger.error(args);
    }
    fatal(...args: any[]): void {
        ServerLogger.logger.fatal(args);
    }


}