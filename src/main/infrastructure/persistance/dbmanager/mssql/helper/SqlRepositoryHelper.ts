import { DatabaseUtil } from '@infrastructure/persistance/dbmanager/mssql/util';
import { Request } from "mssql";
import { IListCondition } from "@core/domain";
import { inject, injectable } from "@core/di";
import { TYPE } from "@infrastructure/di";
import { ILogger } from "@core/logger";
import ISqlRepositoryHelper from './ISqlRepositoryHelper';

@injectable()
export default class SqlRepositoryHelper implements ISqlRepositoryHelper {
    _logger : ILogger;
    constructor(
        @inject(TYPE.LOGGER.DATABASE) logger : ILogger
    ){
        this._logger = logger;
    }
    mapWhereKey(conditionList:IListCondition,types : Map<string,any>){
        conditionList.getConditions().forEach((condition)=>{
            condition.Key = types.get(condition.Key).key;
        })
    }
    setInputParameter(request : Request,conditionList : IListCondition,types : Map<string,any>){
        let conditions = conditionList.getConditions();
        for(let i=0;i<conditions.length;i++){
            let condition = conditions[i];
            let type      = types.get(condition.Key);
            if(!type)
                this._logger.warn(`(BaseRepository:setInputParameter) Parameter Type Not Found. Param Key : ${condition.Key} , Param Value : ${condition.Value}`)
            if(Array.isArray(condition.Value)){
               for(let j =0;j<condition.Value.length;j++){
                    if(type){
                        request.input(`param_${i}_${j}`,type,condition.Value[j]);
                    }
                    else{
                        request.input(`param_${i}_${j}`,condition.Value[j]);
                    }
                    
               }
            }
            else{
                if(type){
                    request.input(`param_${i}`,type,condition.Value);
                }
                else{
                    request.input(`param_${i}`,condition.Value);
                }
            }
            
        }
    }
    async count(request : Request,query : string,conditionList : IListCondition,types : Map<string,any>){
        this.setInputParameter(request,conditionList,types);

        let where= DatabaseUtil.where(conditionList);
        query+= where;
        try{
            let result  = await request.query(query);
            if(result.recordsets && result.recordsets[0].length>0){
                return result.recordset[0].total_count;
            }
            else{
                this._logger.error(`(BaseRepository:count) - Query : ${query} - Affected Row is Zero`);
                return 0;
            }
        }catch(err){
            this._logger.error(`(BaseRepository:count)`,err.code,err.message);
            return Promise.reject(err);
        }

    }

    
}