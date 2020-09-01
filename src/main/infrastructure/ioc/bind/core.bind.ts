

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
import { Ihash } from '@core/hash';
import { PasswordHash } from '@infrastructure/hash';
import { ContactValidator } from '@infrastructure/validator/joi/contact';
import { ContactRequest } from '@core/req.res.model/request/contact';
import IContactEntityGateway from '@core/domain/entity.gateway/contact';
import ContactEntityGateway from '@infrastructure/persistance/entity.gateway/contact';

/**
 * 
 * Authorization bindings
 */

//IOContainer.bind<IJwtAuthorization>(TYPE.AUTH.TOKEN).to(JwtAuthorization).inSingletonScope()
//IOContainer.bind<ISecretAuthorization>(TYPE.AUTH.SECRET).to(SecretAuthorization).inSingletonScope();
 /**
  * OAuth2 token parser
  */

/**
 * 
 * Validator bindings
 */
IOContainer.bind<IValidatorGateway<Joi.Schema>>(TYPE.VALIDATOR.GATEWAY).to(JoiValidatorGateway).inSingletonScope();
IOContainer.bind<IValidationErrorParser>(TYPE.VALIDATOR.ERROR_PARSER).to(JoiErrorParser).inSingletonScope();

//contact
IOContainer.bind<IValidator<ContactRequest>>(TYPE.VALIDATOR.CONTACT_CREATE).to(ContactValidator)
// search

/**
 * Mapper bindings
 */

/**
 * Entity Gateway bindings
 */

 IOContainer.bind<IContactEntityGateway>(TYPE.ENTITY_GATEWAY.CONTACT).to(ContactEntityGateway);


//location
/**
 * Hash
 */

IOContainer.bind<Ihash>(TYPE.HASH.PASSWORD).to(PasswordHash).inSingletonScope();
/**
 * Logger bindings
 */
IOContainer.bind<ILogger>(TYPE.LOGGER.APPLICATION).to(ApplicationLogger).inSingletonScope();



