

import fs from 'fs'
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
import { IEntityGatewayErrorParser } from '@core/domain';
import { MongoErrorParser, MssqlErrorParser } from '@infrastructure/persistance/entity.gateway';
import { GoogleOauth2Config } from '@infrastructure/oauth2.parser.impl/config';
import ApiErrorParser from '@infrastructure/persistance/entity.gateway/error.parser/api.error.parser';
import { JwtToken } from '@core/authorization/entity';
import ITokenParser from '@infrastructure/authorization/parser/ITokenParser';
import { ApplicationLogger } from '@infrastructure/logger';
import { MongoConfig } from '@infrastructure/persistance/dbmanager/config';
import { MongoDBManager } from '@infrastructure/persistance/dbmanager/mongo';
import { ContactController } from '@adapter/controller/contact';
import IContactRepository from '@infrastructure/Irepostiory/contact';
import ContactRepository from '@infrastructure/persistance/repository/contact';

const config    = require('config');

const mongoConfig = config.get('MONGO_DB');


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
IOContainer.bind<ContactController>(TYPE.CONTROLLER.CONTACT_CREATE).to(ContactController)

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
 /**
 * Repository bindings
 */
IOContainer.bind<IContactRepository>(TYPE.REPOSITORY.CONTACT).to(ContactRepository);
/**
 * Entity Gateway Error parser
 */

 /**
 * Entity Gateway Error parser
 */

IOContainer.bind<IEntityGatewayErrorParser>(TYPE.DATABASE.ERROR_PARSER).to(MongoErrorParser).inSingletonScope();
IOContainer.bind<IEntityGatewayErrorParser>(TYPE.API.ERROR_PARSER).to(ApiErrorParser).inSingletonScope();

