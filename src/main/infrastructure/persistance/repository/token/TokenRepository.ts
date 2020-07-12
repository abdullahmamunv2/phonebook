import { TokenSecret } from '@infrastructure/Irepostiory/config';
import { BaseRepository } from "..";
import { ITokenRepository } from "@infrastructure/Irepostiory";
import { Token } from "@core/domain/entity/token";
import { injectable, inject } from "@core/di";
import { TYPE } from '@infrastructure/di';
import { DatabaseManager } from '@infrastructure/persistance/dbmanager/mssql';
import { ILogger } from '@core/logger';
import { Signin } from '@core/domain/entity/signin';
import {sign,SignOptions} from 'jsonwebtoken'
import { EntityGatewayError, ErrorResponse, ERROR_TYPE } from '@core/errors';
@injectable()
export default class TokenRepository extends BaseRepository implements ITokenRepository{  
    _tokenSecret : TokenSecret;
    _pool : DatabaseManager;
    constructor(
        @inject(TYPE.DATABASE.MANAGER) pool : DatabaseManager,
        @inject(TYPE.CONFIG.TOKEN) tokenSecret : TokenSecret,
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger
    ){
        super(logger);
        this._pool = pool;
        this._tokenSecret = tokenSecret;
    }
    async __sign(data:any,privateKey:Buffer,options:SignOptions):Promise<string>{
        return new Promise((resolve,reject)=>{
            sign(data,privateKey,{ algorithm: options.algorithm},(err,token)=>{
                if(err)
                    reject(err);
                else
                    resolve(token);
            })
        })
        
    }

    async get(data:any): Promise<Token> {
        if(data){
            try{
                let acessToken  = await this.__sign(data,this._tokenSecret.privateKey,{algorithm : 'RS256'})
                const token = new Token(acessToken,'',-1);
                return token;
            
            }catch(err){
                this._logger.error(`TokenRepository::get - Error Message : ${err.message}`);
                let errors = [new EntityGatewayError('Token Gerenation error')];
                let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
                return Promise.reject(errorResponse);
            }
        }
        else{
            let errors = [new EntityGatewayError('NOT_VERIFIED')];
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.UNAUTHORIZED_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }
}