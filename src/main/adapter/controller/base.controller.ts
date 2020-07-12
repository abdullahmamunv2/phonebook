
import { injectable} from '@core/di';
import { IReqCondition } from '@core/req.res.model/request/internal/search';
import { ControllerUtil } from '@adapter/util';

@injectable()
export default class BaseController {
    mapConditions(conditions:[]):IReqCondition[]{
        let results : IReqCondition[]  = [];
        conditions.forEach((condition : any)=>{
            results.push({
                Key : condition.key,
                Value : condition.value,
                Operator : ControllerUtil.mapOperator(condition.operator)
            })
        })

        return results;
    }
}