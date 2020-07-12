import { IGoogleSigninEntityGateway, IDirectSigninEntityGateway } from "@core/domain/entity.gateway/signin";
import { Signin} from "@core/domain/entity/signin";
import { injectable,inject } from "@core/di";
import { Token } from "@core/domain/entity/token";
import { ITokenRepository, ISigninRepository, ISignupRepository } from "@infrastructure/Irepostiory";
import { IEntityGatewayErrorParser } from "@core/domain";
import { TYPE } from "@infrastructure/di";
import { EntityGatewayError, ErrorResponse, ERROR_TYPE } from "@core/errors";
import { AuthenticationError } from "@core/domain/entity.exception";
import { DirectSignup } from "@core/domain/entity/signup";

@injectable()
export default class DirectSigninEntityGateway implements IDirectSigninEntityGateway{
    _signupRepository : ISignupRepository
    _tokenRepository  : ITokenRepository;
    _dbErrorParser : IEntityGatewayErrorParser;
    _httpErrorParser : IEntityGatewayErrorParser;
    constructor(
        @inject(TYPE.REPOSITORY.SIGNUP) signupRepository : ISignupRepository,
        @inject(TYPE.REPOSITORY.TOKEN) tokenRepository   : ITokenRepository,
        @inject(TYPE.DATABASE.ERROR_PARSER) dbErrorParser : IEntityGatewayErrorParser,
        @inject(TYPE.API.ERROR_PARSER) httpErrorParser : IEntityGatewayErrorParser,
    ){
        this._signupRepository = signupRepository;
        this._tokenRepository       = tokenRepository;
        this._dbErrorParser         = dbErrorParser;
        this._httpErrorParser       = httpErrorParser;
    }
    async storeDeviceInfo(): Promise<void> {
        try{
           
        }catch(err){

        }
    }
    async getToken(signin: any): Promise<Token> {
        return this._tokenRepository.get(signin);
    }
    async get(username: string): Promise<DirectSignup> {
        let signinInfo = await this._signupRepository.readByUsername(username);
        if(signinInfo)
        {
            return signinInfo;
        }
        else{

            let errors = [new AuthenticationError('Please Sign Up First','USER_NOT_FOUND')];
            let errorResponse = new ErrorResponse<AuthenticationError>(ERROR_TYPE.NO_DATA_FOUND,errors);
            return Promise.reject(errorResponse);
        }
    }    
    async getServerInfo(serverId:string):Promise<undefined>{
        return ;
    }
    
}