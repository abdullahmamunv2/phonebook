import { ILogger } from "@core/logger";
import { injectable } from "@core/di";

import {getLogger, Logger} from 'log4js'

@injectable()
export default class ApiLogger implements ILogger{
    static logger : Logger  = getLogger('Api');

    isDebugEnabled(): boolean {
        return ApiLogger.logger.isDebugEnabled();
    }
    trace(...args: any[]): void {
        ApiLogger.logger.trace(args);
    }    
    debug(...args: any[]): void {
        ApiLogger.logger.debug(args);
    }
    info(...args: any[]): void {
        ApiLogger.logger.info(args);
    }
    warn(...args: any[]): void {
        ApiLogger.logger.warn(args);
    }
    error(...args: any[]): void {
        ApiLogger.logger.error(args);
    }
    fatal(...args: any[]): void {
        ApiLogger.logger.fatal(args);
    }


}