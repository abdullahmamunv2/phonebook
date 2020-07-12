import { ApplicationError, ERROR_TYPE, ErrorResponse } from '@core/errors';
import { Ihash } from "@core/hash";

import {hash,compare} from 'bcrypt';
import { injectable } from "@core/di";

@injectable()
export default class PasswordHash implements Ihash{
    salt : string|number;
    constructor(){
        this.salt = 10;
    }
    hash(text: string): Promise<string> {
        return new Promise((resolve,reject)=>{
            hash(text,this.salt,(err,hash)=>{
                if(err){
                    let errors = [new ApplicationError('UNABLE_TO_HASH_PASSWORD')];
                    let errorResponse = new ErrorResponse<ApplicationError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
                    reject(err);
                }
                else
                    resolve(hash);
            })
        })
    }    
    compare(text: string, hash: string): Promise<boolean> {
        return new Promise((resolve,reject)=>{
            compare(text,hash,(err,result)=>{
                if(err){
                    let errors = [new ApplicationError('UNABLE_TO_COMPARE_HASH_PASSWORD')];
                    let errorResponse = new ErrorResponse<ApplicationError>(ERROR_TYPE.INTERNAL_SERVER_ERROR,errors);
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    }


}