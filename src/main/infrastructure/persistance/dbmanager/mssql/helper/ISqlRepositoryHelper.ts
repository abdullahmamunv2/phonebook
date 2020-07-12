import { IListCondition } from "@core/domain";


export default interface ISqlRepositoryHelper {
    mapWhereKey(conditionList:IListCondition,types : Map<string,any>):void;
    setInputParameter(request : any,conditionList : IListCondition,types : Map<string,any>):void;
    count(request : any,query : string,conditionList : IListCondition,types : Map<string,any>):Promise<void>
}