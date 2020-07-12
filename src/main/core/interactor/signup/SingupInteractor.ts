import { TYPE } from '@core/di';
import { Ihash } from '@core/hash';
import { IValidator } from '@core/validator';
import { DirectSignup} from '@core/domain/entity/signup';
import { Interactor } from '@core/io.port';
import { DirectSignupRequest } from '@core/req.res.model/request/signup';
import { SignupResponse } from '@core/req.res.model/response/signup';
import { Request } from '@core/req.res.model/request';
import { injectable, inject } from '@core/di';
import { IDirectSignupEntityGateway} from '@core/domain/entity.gateway/signup';
import { ILogger } from '@core/logger';


@injectable()
export default class DirectSignupInteractor implements Interactor<Request<DirectSignupRequest>,SignupResponse>{
    _signupEntityGateway : IDirectSignupEntityGateway
    _passwordHash        : Ihash;
    _validator           : IValidator<DirectSignupRequest>
    _logger              : ILogger
    constructor(
        @inject(TYPE.ENTITY_GATEWAY.SIGNUP)
        signupEntityGateway : IDirectSignupEntityGateway,

        @inject(TYPE.HASH.PASSWORD)
        passwordHash        : Ihash,

        @inject(TYPE.VALIDATOR.DIRECT_SIGNUP)
        validator        : IValidator<DirectSignupRequest>,

        @inject(TYPE.LOGGER.APPLICATION)
        logger   : ILogger

    ){
        this._signupEntityGateway = signupEntityGateway;
        this._passwordHash = passwordHash;
        this._validator  = validator;
        this._logger     = logger;
    }
    async execute(request: Request<DirectSignupRequest>): Promise<SignupResponse> {
        let body = request.getBody();
        this._logger.debug(body);
        body     = await this._validator.validate(body);
        let signUpInfo = new DirectSignup(body.username,body.password);
        signUpInfo.parseUsername();
        signUpInfo.password = await this._passwordHash.hash(signUpInfo.password);
        
        signUpInfo     = await this._signupEntityGateway.register(signUpInfo);
        this._logger.debug(signUpInfo);
        
        let token      = await this._signupEntityGateway.getToken({
            userId : signUpInfo.userId,
            type   : 1
        })
        let response   = new SignupResponse();
        response.isUsernameAvailable = signUpInfo.isUsernameAvailable;
        response.accessToken = token.accessToken;
        response.expireIn    = token.expireIn;
        return response;
    }
    
}