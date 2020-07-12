import { TYPE } from '@core/di';
import { IValidator, IValidatorGateway } from '@core/validator';
import { DirectSignupRequest } from '@core/req.res.model/request/signup';
import * as Joi from '@hapi/joi'
import { inject, injectable } from '@core/di';

const usernameRegex = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|(\d+)$/

const schema : Joi.Schema = Joi.object({
    username    : Joi.string().regex(usernameRegex).required().error(()=>'invalid email or mobile'),
    password    : Joi.string().required()
});

@injectable()
export default class DirectSignupValidator implements IValidator<DirectSignupRequest>{
    _validator : IValidatorGateway<Joi.Schema>
    constructor(
        @inject(TYPE.VALIDATOR.GATEWAY) validator : IValidatorGateway<Joi.Schema>
    ){
       this._validator = validator;
    }
    validate(data: DirectSignupRequest): Promise<DirectSignupRequest> {
        return this._validator.validateData<DirectSignupRequest>(data,schema);
    }

}