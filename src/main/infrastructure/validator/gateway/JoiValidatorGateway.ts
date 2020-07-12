import {ValidatorResponse} from "@core/validator";
import {IValidationErrorParser} from "@core/validator";
import {TYPE} from '@core/di'
import { injectable, inject } from "@core/di";
import {ValidatorError} from "@core/errors";
import { ERROR_TYPE } from "@core/errors";
import {IValidatorGateway} from "@core/validator";
import * as Joi from '@hapi/joi'



@injectable()
export default class JoiValidatorGateway implements IValidatorGateway<Joi.Schema>{
    errorGenerator : IValidationErrorParser;
    constructor(
                @inject(TYPE.VALIDATOR.ERROR_PARSER) errorGenerator : IValidationErrorParser
                ){
        this.errorGenerator = errorGenerator
    }
    async validateData<T>(data: T, schema : Joi.Schema): Promise<T> {
        let errors : ValidatorError[] = [];
        try{
            data = await Joi.validate(data,schema,{abortEarly: false,allowUnknown: true});
            return data;
        }catch(error){
            errors = this.errorGenerator.generate(error.details);
            let response   = new ValidatorResponse(ERROR_TYPE.VALIDATION_ERROR,errors);
            throw response;
        }
        
        
    }
}