import * as Joi from '@hapi/joi'


const MSISDN_REGX    = /^(88)(018|016)\d{8}$/;
const msisdn  = (isRequired=false,defaultValue='')=>{
    if(isRequired)
        return Joi.string().regex(MSISDN_REGX).required();
    else
        return Joi.string().regex(MSISDN_REGX).allow(defaultValue).default(defaultValue);
}

export default msisdn;