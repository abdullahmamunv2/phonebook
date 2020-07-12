import {AuthErrorResponse } from "@core/authorization";
import { AuthorizationError, ERROR_TYPE } from "@core/errors";
import { injectable } from "inversify";
import { BasicAuth } from "@core/authorization/entity";
import ITokenParser from "./ITokenParser";

@injectable()
export default class BasicTokenParser implements ITokenParser<BasicAuth>{

    async parse(token: string=''): Promise<BasicAuth> {
        let tokens = token.split(" ");
        if(tokens.length > 1){
            let decodedToken = Buffer.from(tokens[1], 'base64').toString();
            let credentials = decodedToken.split(':');
            if(credentials.length==2){
                let basicToken   = new BasicAuth();
                basicToken.username = credentials[0];
                basicToken.password = credentials[1];
                return basicToken;
            }
            else{
                let error = new AuthorizationError();
                error.message = 'INVALID AUTHORIZATION_HEADER';
                let errorResponse = new  AuthErrorResponse(ERROR_TYPE.UNAUTHORIZED_ERROR,[error]);
                return Promise.reject(errorResponse);
            }
            
        }
        else{
            let error = new AuthorizationError();
            error.message = 'INVALID AUTHORIZATION_HEADER';
            let errorResponse = new  AuthErrorResponse(ERROR_TYPE.UNAUTHORIZED_ERROR,[error]);
            return Promise.reject(errorResponse);
        }
        
    }

}