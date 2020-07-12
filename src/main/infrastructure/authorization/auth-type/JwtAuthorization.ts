import { JwtAuthResponse, JwtAuthRequest } from '@core/authorization/req.res.model/jwt';
import { IJwtAuthorization } from '@core/authorization/auth-type';
import { injectable, inject } from '@core/di';
import ITokenParser from '../parser/ITokenParser';
import { JwtToken } from '@core/authorization/entity';
import { TYPE } from '@infrastructure/di';

@injectable()
export default class JwtAuthorization implements IJwtAuthorization{
    _tokenParser : ITokenParser<JwtToken>
    constructor(
        @inject(TYPE.AUTH.TOKEN_PARSER) tokenParser : ITokenParser<JwtToken>
    ){
        this._tokenParser = tokenParser;
    }
    async authorize(request: JwtAuthRequest, scopes: string[]=[]): Promise<JwtAuthResponse> {
        let token = request._token;
        let tokenInfo = await this._tokenParser.parse(token);
        let response = new JwtAuthResponse(tokenInfo.userId,tokenInfo.jid,tokenInfo.sid,tokenInfo.referrer);
        return response;
    }
    
}