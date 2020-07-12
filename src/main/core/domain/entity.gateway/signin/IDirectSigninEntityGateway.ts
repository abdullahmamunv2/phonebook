import { Signin } from "@core/domain/entity/signin";
import { DirectSignup } from "@core/domain/entity/signup";
import { Token } from "@core/domain/entity/token";

export default interface IDirectSigninEntityGateway{
    get(username:string):Promise<DirectSignup>;
    getToken(signin:any):Promise<Token>;
    getServerInfo(serverId:string):Promise<undefined>;
}