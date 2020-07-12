
import { IGoogleIdTokenParser, GoogleTokenInfo, FacebookTokenInfo, IFacebookTokenParser } from "@core/oauth2.parser";
import {OAuth2Client}  from 'google-auth-library'
import { injectable,inject } from "@core/di";
import { GoogleOauth2Config } from "./config";
import { TYPE } from "@infrastructure/di";
import { AuthenticationError } from "@core/domain/entity.exception";
import { ERROR_TYPE, ErrorResponse, EntityGatewayError } from "@core/errors";
import { IFacebookRepository } from "@infrastructure/Irepostiory";
import { IEntityGatewayErrorParser } from "@core/domain";


@injectable()
export default class FacebookTokenParser implements IFacebookTokenParser{
    _httpErrorParser : IEntityGatewayErrorParser;
    _facebookRepository : IFacebookRepository;
    constructor(
        //@inject(TYPE.CONFIG.GOOGLE_OAUTH2) oauth2Config : GoogleOauth2Config;
        @inject(TYPE.REPOSITORY.FACEBOOK) facebookRepository : IFacebookRepository,
        @inject(TYPE.API.ERROR_PARSER) httpErrorParser : IEntityGatewayErrorParser,
    ){
        this._facebookRepository    = facebookRepository;
        this._httpErrorParser       = httpErrorParser;
    }
    async parse(accessToken: string, fbId : string): Promise<FacebookTokenInfo> {
        try {
            let fbUserInfo = await this._facebookRepository.getInfo(accessToken, fbId);
            return fbUserInfo;
        } catch (error) {
            let errors = [new EntityGatewayError('UNABLE_TO_SIGN_IN_THROUGH_FACEBOOK')];
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
        

    }
}