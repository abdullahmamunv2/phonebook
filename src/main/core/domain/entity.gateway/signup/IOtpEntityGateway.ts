import { DirectSignup } from "@core/domain/entity/signup";
import { Signin } from "@core/domain/entity/signin";
import { Token } from "@core/domain/entity/token";


export default interface IOtpEntityGateway{
    getSignup(referenceId:string):Promise<DirectSignup>
    getSignIn(username:string):Promise<Signin|undefined>;
    expire(referenceId:string):Promise<boolean>;
    createProfile(signupInfo: DirectSignup):Promise<Signin>
    getToken(signin:Signin):Promise<Token>;
}