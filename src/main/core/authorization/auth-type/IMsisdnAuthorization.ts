import {
    IAuthorization
} from '@core/authorization'
import { MsisdnAuthRequest, MsisdnAuthResponse } from '@core/authorization/req.res.model';


export default interface IMsisdnAuthorization extends IAuthorization<MsisdnAuthRequest,MsisdnAuthResponse>{
    
}