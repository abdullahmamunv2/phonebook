import { DirectSignup } from "@core/domain/entity/signup";


export default interface ISignupRepository {
    create(signupInfo:DirectSignup):Promise<DirectSignup>;
    read(referanceId:string):Promise<DirectSignup|undefined>;
    readByUsername(username:string):Promise<DirectSignup|undefined>;
    setExpire(referanceId:string,status:boolean):Promise<boolean>;
}