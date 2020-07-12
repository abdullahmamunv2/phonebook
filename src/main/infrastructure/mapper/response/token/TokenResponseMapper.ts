import { IMapper } from '@core/mapper';
import { TokenResponse } from '@core/req.res.model/response/token';
import { Signin } from '@core/domain/entity/signin';
import { injectable } from '@core/di';
import { ProfileResponse } from '@core/req.res.model/response/profile';

@injectable()
export default class TokenResponseMapper implements IMapper<Signin,TokenResponse>{
    map(param: Signin): TokenResponse {
        let response = new TokenResponse();
        
        return response;
    }
    
}