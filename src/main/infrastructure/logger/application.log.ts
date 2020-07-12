import { ILogger } from "@core/logger";
import { injectable } from "@core/di";

import {getLogger, Logger} from 'log4js'

@injectable()
export default class ApplicationLogger implements ILogger{
    static logger : Logger  = getLogger('Application');

    isDebugEnabled(): boolean {
        return ApplicationLogger.logger.isDebugEnabled();
    }
    trace(...args: any[]): void {
        ApplicationLogger.logger.trace(args);
    }    
    debug(...args: any[]): void {
        ApplicationLogger.logger.debug(args);
    }
    info(...args: any[]): void {
        ApplicationLogger.logger.info(args);
    }
    warn(...args: any[]): void {
        ApplicationLogger.logger.warn(args);
    }
    error(...args: any[]): void {
        ApplicationLogger.logger.error(args);
    }
    fatal(...args: any[]): void {
        ApplicationLogger.logger.fatal(args);
    }


}