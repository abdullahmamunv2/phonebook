import { Token } from '@core/domain/entity/token';


export default interface ITokenEntityGateway{
    generate(referenceId:number|number) : Promise<Token>
    generate(username:string,password:string):Promise<Token>
    revoke(token:string ):Promise<boolean>
    refresh(acessToken:string,refreshToken:string):Promise<Token>;
}