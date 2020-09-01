import { inject, injectable } from "@core/di";
import {ContactRequest} from "@core/req.res.model/request/contact";
import { IValidator, IValidatorGateway } from "@core/validator";
import { TYPE } from '@core/di';
import * as Joi from '@hapi/joi'

const mobileRegex = /^(01)(3|4|5|7|8)\d{8}$/

const schema : Joi.Schema = Joi.object({
    number   : Joi.string().regex(mobileRegex).required().error(()=>'Invalid Mobile Number.'),
    name     : Joi.string().required()
});

@injectable()
export class ContactValidator implements IValidator<ContactRequest>{
    _validator : IValidatorGateway<Joi.Schema>
    constructor(
        @inject(TYPE.VALIDATOR.GATEWAY) validator : IValidatorGateway<Joi.Schema>
    ){
       this._validator = validator;
    }
    validate(data: ContactRequest): Promise<ContactRequest> {
        return this._validator.validateData<ContactRequest>(data,schema);
    }

}