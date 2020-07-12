import OPERATOR from "./Operator";

export default interface ICondition{
    Key : string;
    Value : any;
    Operator : OPERATOR;
}