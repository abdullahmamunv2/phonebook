import { inject, injectable } from "@core/di";
import { ILogger } from "@core/logger";

@injectable()
export default class BaseRepository{
    _logger : ILogger;
    constructor(
        logger : ILogger
    ){
        this._logger = logger;
    }
}