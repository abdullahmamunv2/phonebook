import ReqOperator from './operator.request';
export default interface IReqCondition{
    Key : string;
    Value : number | string | (string | number)[];
    Operator : ReqOperator;
}