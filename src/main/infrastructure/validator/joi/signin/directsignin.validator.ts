import { IValidator, IValidatorGateway } from '@core/validator';
//import { OtpSendRequest } from '@core/req.res.model/request/otp';
import { TYPE } from '@core/di';
import * as Joi from '@hapi/joi'
import { inject, injectable } from '@core/di';
import { DirectSigninRequest } from '@core/req.res.model/request/signin';

const usernameRegex = /^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|(\d+)$/

const schema : Joi.Schema = Joi.object({
    username    : Joi.string().regex(usernameRegex).required().error(()=>'invalid email or mobile'),
    password    : Joi.string().required()
});

@injectable()
export default class DirectSigninValidator implements IValidator<DirectSigninRequest>{
    _validator : IValidatorGateway<Joi.Schema>
    constructor(
        @inject(TYPE.VALIDATOR.GATEWAY) validator : IValidatorGateway<Joi.Schema>
    ){
       this._validator = validator;
    }
    validate(data: DirectSigninRequest): Promise<DirectSigninRequest> {
        return this._validator.validateData<DirectSigninRequest>(data,schema);
    }

}