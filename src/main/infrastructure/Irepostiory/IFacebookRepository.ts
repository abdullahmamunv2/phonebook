import { FacebookTokenInfo } from "@core/oauth2.parser/entity";



export default interface    IFacebookRepository{
    getInfo(accessToken: string, userId : string): Promise<FacebookTokenInfo> 
}