import {
    IAuthorization
} from '@core/authorization'
import { BasicAuthRequest, BasicAuthResponse } from '@core/authorization/req.res.model';


export default interface IBasicAuthorization extends IAuthorization<BasicAuthRequest,BasicAuthResponse>{
    
}