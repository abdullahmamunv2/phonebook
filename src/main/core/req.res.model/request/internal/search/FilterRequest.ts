import IReqCondition from "./condition.request";

export default  class FilterRequest{
    page     : number=0;
    limit    : number=100;
    query    : IReqCondition[] = [];
}