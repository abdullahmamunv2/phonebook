
import { IGoogleIdTokenParser, GoogleTokenInfo } from "@core/oauth2.parser";
import {OAuth2Client}  from 'google-auth-library'
import { injectable,inject } from "@core/di";
import { GoogleOauth2Config } from "./config";
import { TYPE } from "@infrastructure/di";
import { AuthenticationError } from "@core/domain/entity.exception";
import { ERROR_TYPE, ErrorResponse } from "@core/errors";

@injectable()
export default class GoogleIdTokenParser implements IGoogleIdTokenParser<GoogleTokenInfo>{
    oauth2Client : OAuth2Client;
    oauth2Config : GoogleOauth2Config
    constructor(
        @inject(TYPE.CONFIG.GOOGLE_OAUTH2) oauth2Config : GoogleOauth2Config
    ){
        this.oauth2Config = oauth2Config;
        this.oauth2Client = new OAuth2Client(oauth2Config.CLIENT_ID);
    }
    async parse(token: string): Promise<GoogleTokenInfo> {
        try{
            const ticket = await this.oauth2Client.verifyIdToken({
                idToken: token,
                audience: this.oauth2Config.CLIENT_ID
            });
            const payload = ticket.getPayload();
            if(payload && payload.email){
                const userId  = payload.sub;
                const email   = payload.email;
                const name    = payload.name;
                const picture = payload.picture;
                return new GoogleTokenInfo(userId,email,name,picture);
            }
            else{
                let errors = [new AuthenticationError('EMAIL_NOT_FOUND',1234)];
                let errorResponse = new ErrorResponse<AuthenticationError>(ERROR_TYPE.AUTHENTICATION_ERROR,errors);
                return Promise.reject(errorResponse);
            }
            
        }catch(err){
            console.error(err);
            let errors = [new AuthenticationError('INVALID_ID_TOKEN',1000)];
            let errorResponse = new ErrorResponse<AuthenticationError>(ERROR_TYPE.AUTHENTICATION_ERROR,errors);
            return Promise.reject(errorResponse);
        }
        

    }
}