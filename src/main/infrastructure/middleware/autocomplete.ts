import { Request,Response,NextFunction } from "express";
import {keys,difference} from 'lodash'

const OPERATOR : any = {
    EQ          : '_eq',
    NEQ         : '_neq',
    LT          : '_lt',
    GT          : '_gt',
    LTEQ        : '_lteq',
    GTEQ        : '_gteq',
    IN          : '_in',
    CONTAIN     : '_contain',
    CONTAINS    : '_contains'
}

function parseKey(key:string):any{
    let spilts = key.split("::");
    if(spilts.length == 1){
        return {
            key :  spilts[0].trim(),
            operator :  OPERATOR.EQ
        }
    }
    else{
        return {
            key :  spilts[0].trim(),
            operator :  spilts[0].trim()
        }
    }
}
function parseValue(operator:string,value:string){
    switch(operator){
        case OPERATOR.IN:
            return value.split(",")
        default :
            return value;
    }
}
export default (excludes=['limit','page','q'])=>{
    return (req:any,res:Response,next :NextFunction )=>{
        let reqQuery = req.query;
        let query :any = {};

        if(reqQuery.q){
            query.q = reqQuery.q;
        }
        if(reqQuery.page){
            query.page = reqQuery.page;
        }
        if(reqQuery.limit){
            query.limit = reqQuery.limit;
        }
        const queryKeys = difference(keys(req.query),excludes);
        let conditions:any = []
        queryKeys.forEach((key)=>{
            let result  = parseKey(key);
            result.value = parseValue(result.operator,reqQuery[key])
            conditions.push(result)
        })
        query.query = conditions;
        console.log(query);
        req.autocomplete = query;
        next();
    }
}