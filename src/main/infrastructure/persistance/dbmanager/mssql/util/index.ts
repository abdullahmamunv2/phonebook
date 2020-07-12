import {Operator, ISort, ORDER, IListCondition, IListSort, IPagination } from '@core/domain';
import { isArray } from 'util';



export class DatabaseUtil {

    static where(conditionList : IListCondition){
        let clause = '';
        let connector = 'AND';
        let where  = 'WHERE'
        let conditions = conditionList.getConditions();
        for(let i=0;i<conditions.length;i++){
            let condition = conditions[i];
            let valueExpression = DatabaseUtil._parseValueExpression(condition.Value,i);
            let restExpression  = DatabaseUtil._glueValueWithOperator(condition.Operator,valueExpression);
            clause += `${condition.Key} ${restExpression}`
            if(i < conditions.length -1){
                clause+=` ${connector} `;
            }
        }
        if(conditions.length > 0){
            clause=` ${where} ${clause}` ;
        }
        return clause;
    }
    static sort(sortList : IListSort){
        let clause = "";
        let orders = sortList.getSorts();
        if(orders && orders.length > 0){
            clause+=' ORDER BY ';
            for(let i =0 ; i<orders.length;i++){
                let order = orders[i];
                let operator = DatabaseUtil._parseSortExpression(order.Order);
                if(i== orders.length-1){
                    clause+=`${order.Key} ${operator} `;
                }
                else{
                    clause+=`${order.Key} ${operator}, `;
                }

            };
        }
        else{
            clause+= ' ORDER BY (SELECT null)'
        }

        return clause;
    }
    static pagination(pagination:IPagination){
        let query = ` OFFSET ${pagination.limit * pagination.page} ROWS FETCH NEXT ${pagination.limit} ROWS ONLY`;
        return query;
    }
    static _glueValueWithOperator(operator:Operator,value:any){
        let expression =  DatabaseUtil._parseOperatorExpression(operator)
        switch(operator){
            case Operator.IN:
                return ` ${expression}(${value}) `
            case Operator.CONTAIN:
            case Operator.CONTAINS:
                return ` ${expression} '%'+${value}+'%' `
            default:
                return ` ${expression} ${value} `
        }
        
    }
    static _parseValueExpression(value : any,prefix:number){
        let valueStr = '';
        if(isArray(value)){
            for(let i=0;i<value.length;i++){
                if(i <value.length-1)
                    valueStr+=`@param_${prefix}_${i} ,`
                else
                    valueStr+= `@param_${prefix}_${i}`;
            }
        }
        else{
            valueStr+= `@param_${prefix}`
        }
        return valueStr;
    }
    static _parseSortExpression(operator : ORDER){
        switch(operator){
            case ORDER.ASC:
                return 'ASC';
            case ORDER.DESC:
                return 'DESC';
        }
    }
    static _parseOperatorExpression(operator : Operator){
        switch(operator){
            case Operator.EQ:
                return '=';
            case Operator.GT:
                return '>';
            case Operator.GTEQ:
                return '>=';
            case Operator.LT:
                return '<';
            case Operator.LTEQ:
                return '<=';
            case Operator.NEQ:
                return '!=';
            case Operator.IN:
                return 'IN';
            case Operator.CONTAIN:
                return 'LIKE';
            case Operator.CONTAINS :
                return 'COLLATE SQL_Latin1_General_CP1_CS_AS LIKE'
        }
    }


    
}