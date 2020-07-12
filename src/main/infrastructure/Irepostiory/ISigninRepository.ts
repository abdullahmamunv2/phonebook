import { Signin } from "@core/domain/entity/signin";


export default interface    ISigninRepository{
    read(userId:number):Promise<Signin|undefined>
    updateSipStatus(userId:number,status:number):Promise<boolean>
    readByUsername(username : string,referrer:number ):Promise<Signin|undefined>
    create(signin : Signin):Promise<Signin>
}