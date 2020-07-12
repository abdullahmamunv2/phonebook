import { DirectSignup} from "@core/domain/entity/signup";
import { Token } from "@core/domain/entity/token";
import { SignupResponse } from "@core/req.res.model/response/signup";

export default interface IDirectSignupEntityGateway{
    register(signupInfo:DirectSignup):Promise<DirectSignup>;
    getToken(data : any) : Promise<Token>
    get(referanceId:string):Promise<DirectSignup>;
}