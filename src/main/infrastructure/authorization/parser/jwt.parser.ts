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
export default class JwtParser implements ITokenParser<JwtToken>{
    _tokenSecret : TokenSecret;
    _logger      : ILogger;
    constructor(
        @inject(TYPE.CONFIG.TOKEN) tokenSecret : TokenSecret,
        @inject(TYPE.LOGGER.APPLICATION) logger : ILogger
    ){
        this._tokenSecret = tokenSecret;
        this._logger      = logger;
    }
    async parse(token: string): Promise<JwtToken> {
        try{
            let data  = await this.__verify(token,this._tokenSecret.publicKey,{algorithms : ['RS256']});
            let jwtToken = new JwtToken(data.userId,data.jid,data.sid,data.referrer);
            return jwtToken;
        }catch(err){
            this._logger.error(`JwtParser::parse - Error Message : ${err.message}`);
            let errors = [new AuthenticationError('Invalid token','INVALID_TOKEN')];
            let errorResponse = new ErrorResponse<AuthenticationError>(ERROR_TYPE.UNAUTHORIZED_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }

    async __verify(token:string,publicKey:Buffer,options:VerifyOptions):Promise<JwtToken>{
        return new Promise((resolve,reject)=>{
            verify(token,publicKey,options,(err:any,decoded:any)=>{
                if(err)
                    reject(err);
                else
                    resolve(decoded);
            })
        })
        
    }

}