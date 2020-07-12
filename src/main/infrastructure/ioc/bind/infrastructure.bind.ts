
import {IUploadRepository, IFacebookRepository} from '@infrastructure/Irepostiory';
import fs from 'fs'
import { ISignupRepository, ISigninRepository, ITokenRepository } from '@infrastructure/Irepostiory';
import IOContainer from '@infrastructure/ioc/ioc.instance';
import { TYPE } from '@infrastructure/di';
import DatabaseManager from '@infrastructure/persistance/dbmanager/mssql/manager';
import { ILogger } from '@core/logger';
import DatabaseLogger from '@infrastructure/logger/database.log';
import {config as DBConfig} from 'mssql';
import { TokenSecret, ResouceConfig,UploadConfig} from '@infrastructure/Irepostiory/config';
import ApiLogger from '@infrastructure/logger/api.log';
import { BasicTokenParser, JwtParser, SecretTokenParser } from '@infrastructure/authorization/parser';
import { BasicTokenConfig, PushSecretConfig } from '@infrastructure/authorization/config';
import { MongoSignupRepository } from '@infrastructure/persistance/repository/signup';
import { DirectSignupController } from '@adapter/controller/singup';
import { IEntityGatewayErrorParser } from '@core/domain';
import { MssqlErrorParser } from '@infrastructure/persistance/entity.gateway';
import { GoogleOauth2Config } from '@infrastructure/oauth2.parser.impl/config';
import { SigninRepository } from '@infrastructure/persistance/repository/signin';
import TokenRepository from '@infrastructure/persistance/repository/token/TokenRepository';
import ApiErrorParser from '@infrastructure/persistance/entity.gateway/error.parser/api.error.parser';
import DirectSigninController from '@adapter/controller/signin/DirectSigninController';
import { JwtToken } from '@core/authorization/entity';
import ITokenParser from '@infrastructure/authorization/parser/ITokenParser';
import { UploadController } from '@adapter/controller/upload';
import { ApplicationLogger } from '@infrastructure/logger';
import { UploadRepository } from '@infrastructure/persistance/repository/upload';
import FacebookRepository from '@infrastructure/persistance/repository/fb/FacebookRepository';
import { MongoConfig } from '@infrastructure/persistance/dbmanager/config';
import { MongoDBManager } from '@infrastructure/persistance/dbmanager/mongo';
const config    = require('config');
const dbConfig  = config.get('SQL_SERVER');
const mongoConfig = config.get('MONGO_DB');
const oauth2Config = config.get('OAUTH2');
const googleOauth2Config = oauth2Config.google;
const tokenSecretConfig = config.get('TOKEN_SECRET');
const uploadConfig      = config.get('FILE_UPLOAD');
const tokenSecret :TokenSecret = {
    publicKey   : fs.readFileSync(global.rootPath+'token-secret/public.key'),
    privateKey  : fs.readFileSync(global.rootPath+'token-secret/private.key'),
    secret      : tokenSecretConfig.secret,
    alg         : tokenSecretConfig.alg
}


/**
 * 
 * Authorization bindings
 */
 IOContainer.bind<ITokenParser<JwtToken>>(TYPE.AUTH.TOKEN_PARSER).to(JwtParser).inSingletonScope()
 IOContainer.bind<ITokenParser<boolean>>(TYPE.AUTH.SECRET_PARSER).to(SecretTokenParser).inSingletonScope();
/**
 * SECRET_PARSER
 * Controller bindings
 */

IOContainer.bind<DirectSignupController>(TYPE.CONTROLLER.DIRECT_SIGNUP).to(DirectSignupController).inSingletonScope()
IOContainer.bind<DirectSigninController>(TYPE.CONTROLLER.DIRECT_SIGN_IN).to(DirectSigninController).inSingletonScope()
IOContainer.bind<UploadController>(TYPE.CONTROLLER.UPLOAD).to(UploadController).inSingletonScope();
/**
 * Logger bindings
 */
IOContainer.bind<ILogger>(TYPE.LOGGER.DATABASE).to(DatabaseLogger).inSingletonScope();
IOContainer.bind<ILogger>(TYPE.LOGGER.API).to(ApiLogger).inSingletonScope();
IOContainer.bind<ILogger>(TYPE.LOGGER.APPLICATION).to(ApplicationLogger).inSingletonScope();


/**
 * Manager
 */
IOContainer.bind<MongoDBManager>(TYPE.DATABASE.MONGO_MANAGER).to(MongoDBManager).inSingletonScope();
IOContainer.bind<DatabaseManager>(TYPE.DATABASE.MANAGER).to(DatabaseManager).inSingletonScope();

/**
 * Config bindings
 */
IOContainer.bind<MongoConfig>(TYPE.CONFIG.MONGO_DATABASE).toConstantValue(mongoConfig);
IOContainer.bind<DBConfig>(TYPE.CONFIG.DATABASE).toConstantValue(dbConfig);
IOContainer.bind<GoogleOauth2Config>(TYPE.CONFIG.GOOGLE_OAUTH2).toConstantValue(googleOauth2Config);
IOContainer.bind<TokenSecret>(TYPE.CONFIG.TOKEN).toConstantValue(tokenSecret);
IOContainer.bind<UploadConfig>(TYPE.CONFIG.UPLOAD).toConstantValue(uploadConfig);
 /**
 * Repository bindings
 */
IOContainer.bind<ISignupRepository>(TYPE.REPOSITORY.SIGNUP).to(MongoSignupRepository).inSingletonScope()
IOContainer.bind<ISigninRepository>(TYPE.REPOSITORY.SIGNIN).to(SigninRepository).inSingletonScope();
IOContainer.bind<ITokenRepository>(TYPE.REPOSITORY.TOKEN).to(TokenRepository).inSingletonScope();

IOContainer.bind<IUploadRepository>(TYPE.REPOSITORY.UPLOAD).to(UploadRepository).inSingletonScope();
IOContainer.bind<IFacebookRepository>(TYPE.REPOSITORY.FACEBOOK).to(FacebookRepository).inSingletonScope();
/**
 * Entity Gateway Error parser
 */

 /**
 * Entity Gateway Error parser
 */

IOContainer.bind<IEntityGatewayErrorParser>(TYPE.DATABASE.ERROR_PARSER).to(MssqlErrorParser).inSingletonScope();
IOContainer.bind<IEntityGatewayErrorParser>(TYPE.API.ERROR_PARSER).to(ApiErrorParser).inSingletonScope();

