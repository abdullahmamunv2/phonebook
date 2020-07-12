import { Token } from "@core/domain/entity/token";
import { Signin } from "@core/domain/entity/signin";


export default interface ITokenRepository{
    get(signin:Signin):Promise<Token>
}