import { ReqOperator } from "@core/req.res.model/request/internal/search";

export default class ControllerUtil {
    static OPERATOR_MAPPER :any  = {
        '_eq'       : ReqOperator.EQ,
        '_neq'      : ReqOperator.NEQ,
        '_lt'       : ReqOperator.LT,
        '_gt'       : ReqOperator.GT,
        '_lteq'     : ReqOperator.LTEQ,
        '_gteq'     : ReqOperator.GTEQ,
        '_in'       : ReqOperator.IN,
        '_contain'  : ReqOperator.CONTAIN,
        '_contains' : ReqOperator.CONTAINS
    }

    static mapOperator(operator : string ) : ReqOperator{
        return ControllerUtil.OPERATOR_MAPPER[operator];
    }
}