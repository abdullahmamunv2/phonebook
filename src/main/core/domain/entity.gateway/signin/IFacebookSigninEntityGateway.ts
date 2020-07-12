import { Signin } from "@core/domain/entity/signin";
import { Token } from "@core/domain/entity/token";

export default interface IFacebookSigninEntityGateway{
    get(username:string):Promise<Signin|undefined>;
    create(signin:Signin):Promise<Signin>;
    token(signin:Signin):Promise<Token>;
    getServerInfo(serverId:string):Promise<undefined>;
}