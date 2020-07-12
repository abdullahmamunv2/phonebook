import { PushSecretConfig } from '@infrastructure/authorization/config';
import ITokenParser from './ITokenParser';
import { JwtToken } from "@core/authorization/entity";
import {inject,injectable}     from '@core/di'
import { TokenSecret } from '@infrastructure/Irepostiory/config';
import { TYPE } from '@infrastructure/di';
import {verify,VerifyOptions} from 'jsonwebtoken'
import { ILogger } from '@core/logger';
import { ErrorResponse, ERROR_TYPE } from '@core/errors';
import { AuthenticationError } from '@core/domain/entity.exception';

@injectable()
export default class SecretTokenParser implements ITokenParser<boolean>{
    _tokenSecret : PushSecretConfig;
    _logger      : ILogger;
    constructor(
        @inject(TYPE.AUTH.CONFIG.SECRET) tokenSecret : PushSecretConfig,
        @inject(TYPE.LOGGER.APPLICATION) logger : ILogger
    ){
        this._tokenSecret = tokenSecret;
        this._logger      = logger;
    }
    async parse(token: string): Promise<boolean> {
        if(token === this._tokenSecret.token)
            return true;
        else{
            this._logger.error(`SecretTokenParser::parse - Error Message : Token doesn't match`);
            let errors = [new AuthenticationError('Invalid token','INVALID_TOKEN')];
            let errorResponse = new ErrorResponse<AuthenticationError>(ERROR_TYPE.AUTHENTICATION_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }

}