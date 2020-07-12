
import { ISecretAuthorization } from '@core/authorization/auth-type';
import { injectable, inject } from '@core/di';
import { ITokenParser } from '../parser';
import { TYPE } from '@infrastructure/di';


@injectable()
export default class SecretAuthorization implements ISecretAuthorization{
    _tokenParser : ITokenParser<boolean>
    constructor(
        @inject(TYPE.AUTH.SECRET_PARSER) tokenParser : ITokenParser<boolean>
    ){
        this._tokenParser = tokenParser;
    }
    async authorize(request: string, scopes: string[]=[]): Promise<boolean> {
        let token = request;
        let isValid = await this._tokenParser.parse(token);
        return isValid;
    }
}