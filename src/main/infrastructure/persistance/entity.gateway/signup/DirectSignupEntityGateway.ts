import { ISignupRepository, ITokenRepository } from '@infrastructure/Irepostiory';
import { IDirectSignupEntityGateway } from '@core/domain/entity.gateway/signup';
import { DirectSignup } from '@core/domain/entity/signup';
import { injectable, inject } from '@core/di';
import { TYPE } from '@infrastructure/di';
import { ErrorResponse, EntityGatewayError, ERROR_TYPE } from '@core/errors';
import { IEntityGatewayErrorParser } from '@core/domain';
import { SignupResponse } from '@core/req.res.model/response/signup';
import { Token } from '@core/domain/entity/token';

@injectable()
export default class DirectSignupEntityGateway implements IDirectSignupEntityGateway{
    _signupRepository : ISignupRepository
    _tokenRepository  : ITokenRepository;
    _errorParser : IEntityGatewayErrorParser
    constructor(
        @inject(TYPE.REPOSITORY.SIGNUP) signupRepository : ISignupRepository,
        @inject(TYPE.REPOSITORY.TOKEN) tokenRepository   : ITokenRepository,
        @inject(TYPE.DATABASE.ERROR_PARSER) errorPaeser  : IEntityGatewayErrorParser
    ){
        this._signupRepository = signupRepository;
        this._tokenRepository  = tokenRepository;
        this._errorParser      = errorPaeser;
    }
    async getToken(data: any): Promise<Token> {
        return this._tokenRepository.get(data);
    }
    async register(signupInfo: DirectSignup): Promise<DirectSignup> {
        try{
            signupInfo = await this._signupRepository.create(signupInfo);
            return signupInfo;
        }catch(error){
            let errors = this._errorParser.generate(error);
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }
    }    
    async get(referanceId: string): Promise<DirectSignup> {
        try{
            let signupInfo = await this._signupRepository.read(referanceId);
            if(!signupInfo){
                let errors = [new EntityGatewayError('NO DATA FOUND')];
                let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.NO_DATA_FOUND,errors);
                return Promise.reject(errorResponse);
            }
            return signupInfo;
        }catch(error){
            let errors = this._errorParser.generate(error);
            let errorResponse = new ErrorResponse<EntityGatewayError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
            return Promise.reject(errorResponse);
        }

        
        
    }


}