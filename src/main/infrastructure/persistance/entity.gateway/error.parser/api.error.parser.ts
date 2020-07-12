import { injectable} from "@core/di";
import {EntityGatewayError} from "@core/errors";
import { IEntityGatewayErrorParser } from "@core/domain";

@injectable()
export default class ApiErrorParser implements IEntityGatewayErrorParser{
    generate(error: any): EntityGatewayError[] {
        let errors : EntityGatewayError[] = [];
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            errors.push({
                message: `Response Error : ${error.response.status}:${error.response.statusText}`,
                code : 0,
            });
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errors.push({
                message: `Request Error`,
                code : 0,
            });
          } else {
            // Something happened in setting up the request that triggered an Error
                errors.push({
                    message: `Request Setting Error.`,
                    code : 0,
                });
          }
        return errors;
    }

}