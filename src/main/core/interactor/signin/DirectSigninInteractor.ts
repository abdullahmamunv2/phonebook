import { TokenResponse } from '@core/req.res.model/response/token';
import { TYPE } from '@core/di';
import { Interactor } from '@core/io.port';
import { injectable, inject } from '@core/di';
import { ILogger } from '@core/logger';
import { IDirectSigninEntityGateway } from '@core/domain/entity.gateway/signin';
import { Signin } from '@core/domain/entity/signin';
import { Ihash } from '@core/hash';
import { DirectSigninRequest } from '@core/req.res.model/request/signin';
import { IValidator } from '@core/validator';
import { IMapper } from '@core/mapper';


@injectable()
export default class DirectSigninInteractor implements Interactor<DirectSigninRequest,TokenResponse>{
    _directSigninEntityGateway : IDirectSigninEntityGateway;
    _validator        : IValidator<DirectSigninRequest>;
    _responseMapper   : IMapper<Signin,TokenResponse>
    _passwordHash        : Ihash;
    _logger : ILogger;
    constructor(
        @inject(TYPE.HASH.PASSWORD)
        passwordHash        : Ihash,

        @inject(TYPE.ENTITY_GATEWAY.DIRECT_SIGNIN) 
        directSigninEntityGateway : IDirectSigninEntityGateway,

        @inject(TYPE.MAPPER.RESPONSE.TOKEN)
        responseMapper   : IMapper<Signin,TokenResponse>,

        @inject(TYPE.LOGGER.APPLICATION) 
        logger : ILogger,

        @inject(TYPE.VALIDATOR.DIRECT_SIGNIN)
        validator        : IValidator<DirectSigninRequest>
    ){
        this._directSigninEntityGateway = directSigninEntityGateway;
        this._responseMapper = responseMapper;
        this._passwordHash = passwordHash;
        this._logger = logger;
        this._validator = validator;
    }
    async execute(request: DirectSigninRequest): Promise<TokenResponse> {
        request     = await this._validator.validate(request);
        let signinInfo = await this._directSigninEntityGateway.get(request.username);
        if(!signinInfo.password){
            signinInfo.password = '';
        }
        let isVerified = await this._passwordHash.compare(request.password, signinInfo.password);
        
        let token    = await this._directSigninEntityGateway.getToken({
            userId : signinInfo.userId,
            type   : 1
        });
        let response = await this._responseMapper.map(signinInfo);
        response.accessToken = token.accessToken;
        response.expireIn    = token.expireIn;
        return response;
            
    }   

}