import { AuthorizationError, ERROR_TYPE } from '@core/errors';


import {
    injectable
} from '@core/di'
import ITokenParser from './ITokenParser';
import { Msisdn } from '@core/authorization/entity';
import { AuthErrorResponse } from '@core/authorization';

@injectable()
export default class MsisdnParser implements ITokenParser<Msisdn>{
    MSISDN_REGX    = /^(88)(018|016)\d{8}$/;
    constructor(){

    }
    async parse(token: string): Promise<Msisdn> {
        let isValid = this.MSISDN_REGX.test(token);
        if(isValid){
            let prefix  = token.substring(0,5);
            let opeator = prefix === '88018'? 'ROBI' : 'AIRTEL'
            let msisdn = new Msisdn();
            msisdn._msisdn = token;
            msisdn._operator = opeator;
            msisdn._prefix = prefix;
            return msisdn;  
        }
        else{
            let error = new AuthorizationError();
            error.message = 'INVALID MSISDN';
            let errorResponse = new  AuthErrorResponse(ERROR_TYPE.UNAUTHORIZED_ERROR,[error]);
            return Promise.reject(errorResponse);
        }
    }

}