import {
    IAuthorization
} from '@core/authorization'
import { JwtAuthRequest, JwtAuthResponse } from '@core/authorization/req.res.model/jwt';


export default interface IJwtAuthorization extends IAuthorization<JwtAuthRequest,JwtAuthResponse>{
    
}