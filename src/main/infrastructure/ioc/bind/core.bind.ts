

import { UploadResponse } from '@core/req.res.model/response/upload';
import * as Joi from '@hapi/joi'

import { IMapper } from '@core/mapper';
import { IValidator, IValidatorGateway } from '@core/validator';
import IOContainer from '@infrastructure/ioc/ioc.instance';
import { TYPE } from '@core/di';
import { IValidationErrorParser } from '@core/validator';
import { JoiErrorParser, JoiValidatorGateway } from '@infrastructure/validator';
import { ApplicationLogger } from '@infrastructure/logger';
import { ILogger } from '@core/logger';
import { IQuery } from '@core/domain';
import { IDirectSignupEntityGateway, IOtpEntityGateway } from '@core/domain/entity.gateway/signup';
import { DirectSignupEntityGateway } from '@infrastructure/persistance/entity.gateway/signup';
import { DirectSignupRequest } from '@core/req.res.model/request/signup';
import { DirectSignupValidator } from '@infrastructure/validator/joi/signup';
import { Ihash } from '@core/hash';
import { PasswordHash } from '@infrastructure/hash';
import { IGoogleIdTokenParser, GoogleTokenInfo, IFacebookTokenParser, FacebookTokenInfo } from '@core/oauth2.parser';
import { GoogleIdTokenParser } from '@infrastructure/oauth2.parser.impl';
import { IGoogleSigninEntityGateway, IDirectSigninEntityGateway } from '@core/domain/entity.gateway/signin';
import { DirectSigninEntityGateway } from '@infrastructure/persistance/entity.gateway/signin';
import { DirectSigninRequest, FacebookSigninRequest } from '@core/req.res.model/request/signin';
import { DirectSigninValidator} from '@infrastructure/validator/joi/signin';
import { IUploadEntityGateway } from '@core/domain/entity.gateway/upload';
import { UploadEntityGateway } from '@infrastructure/persistance/entity.gateway/upload';
//import { IGoogleSigninEntityGateway } from '@core/domain/entity.gateway/signin';
//import { GoogleSigninEntityGateway } from '@infrastructure/persistance/entity.gateway/signin';
import { IJwtAuthorization, ISecretAuthorization } from '@core/authorization/auth-type';
import { JwtAuthorization, SecretAuthorization } from '@infrastructure/authorization/auth-type';
//import { IUploadEntityGateway } from '@core/domain/entity.gateway/upload';
//import { UploadEntityGateway } from '@infrastructure/persistance/entity.gateway/upload';
import { UploadRequestMapper } from '@infrastructure/mapper/request/upload';
import { UploadRequest } from '@core/req.res.model/request/upload';
import { File } from '@core/domain/entity/file';
import { UploadReponseMapper } from '@infrastructure/mapper/response/upload';
import { TokenResponseMapper } from '@infrastructure/mapper/response/token';
import { Signin } from '@core/domain/entity/signin';
import { TokenResponse } from '@core/req.res.model/response/token';



/**
 * 
 * Authorization bindings
 */

IOContainer.bind<IJwtAuthorization>(TYPE.AUTH.TOKEN).to(JwtAuthorization).inSingletonScope()
IOContainer.bind<ISecretAuthorization>(TYPE.AUTH.SECRET).to(SecretAuthorization).inSingletonScope();
 /**
  * OAuth2 token parser
  */
 IOContainer.bind<IGoogleIdTokenParser<GoogleTokenInfo>>(TYPE.OAUTH2_TOKEN_PARSER.GOOGLE).to(GoogleIdTokenParser).inSingletonScope();
/**
 * 
 * Validator bindings
 */
IOContainer.bind<IValidatorGateway<Joi.Schema>>(TYPE.VALIDATOR.GATEWAY).to(JoiValidatorGateway).inSingletonScope();
IOContainer.bind<IValidationErrorParser>(TYPE.VALIDATOR.ERROR_PARSER).to(JoiErrorParser).inSingletonScope();

IOContainer.bind<IValidator<DirectSignupRequest>>(TYPE.VALIDATOR.DIRECT_SIGNUP).to(DirectSignupValidator).inSingletonScope();
IOContainer.bind<IValidator<DirectSigninRequest>>(TYPE.VALIDATOR.DIRECT_SIGNIN).to(DirectSigninValidator).inSingletonScope();
// search

/**
 * Mapper bindings
 */

 IOContainer.bind<IMapper<UploadRequest,File>>(TYPE.MAPPER.REQUEST.UPLOAD).to(UploadRequestMapper).inSingletonScope();
 IOContainer.bind<IMapper<File,UploadResponse>>(TYPE.MAPPER.RESPONSE.UPLOAD).to(UploadReponseMapper).inSingletonScope();
 
 IOContainer.bind<IMapper<Signin,TokenResponse>>(TYPE.MAPPER.RESPONSE.TOKEN).to(TokenResponseMapper).inSingletonScope();
/**
 * Entity Gateway bindings
 */

IOContainer.bind<IDirectSignupEntityGateway>(TYPE.ENTITY_GATEWAY.SIGNUP).to(DirectSignupEntityGateway).inSingletonScope()
IOContainer.bind<IDirectSigninEntityGateway>(TYPE.ENTITY_GATEWAY.DIRECT_SIGNIN).to(DirectSigninEntityGateway).inSingletonScope()
//upload
IOContainer.bind<IUploadEntityGateway>(TYPE.ENTITY_GATEWAY.UPLOAD).to(UploadEntityGateway).inSingletonScope()

//location
/**
 * Hash
 */

IOContainer.bind<Ihash>(TYPE.HASH.PASSWORD).to(PasswordHash).inSingletonScope();
/**
 * Logger bindings
 */
IOContainer.bind<ILogger>(TYPE.LOGGER.APPLICATION).to(ApplicationLogger).inSingletonScope();



