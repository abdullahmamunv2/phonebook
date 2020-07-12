import { injectable} from "@core/di";
import {EntityGatewayError} from "@core/errors";
import { IEntityGatewayErrorParser } from "@core/domain";
import {
    ConnectionError,
    TransactionError,
    RequestError,
    PreparedStatementError}          from 'mssql'

@injectable()
export default class MssqlErrorParser implements IEntityGatewayErrorParser{
    generate(error: any): EntityGatewayError[] {
        let errors : EntityGatewayError[] = [];
        if(error instanceof ConnectionError){
            errors.push({
                message: error.message,
                code : 0,
            });
        }
        else if(error instanceof TransactionError){
            errors.push({
                message: error.message,
                code : 0,
            });
        }
        else if(error instanceof RequestError){
            errors.push({
                message: error.message,
                code : 0,
            });
        }
        else if(error instanceof PreparedStatementError){
            errors.push({
                message: error.message,
                code : 0,
            });
        }
        else{
            errors.push({
                message: error.message,
                code : 0,
            });
        }
        return errors;
    }

}