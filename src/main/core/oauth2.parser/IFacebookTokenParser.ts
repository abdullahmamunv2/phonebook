import { FacebookTokenInfo } from "./entity";

export default interface IFacebookTokenParser{
    parse(token:string, fbId: string):Promise<FacebookTokenInfo>;
}