export default interface IValidatorGateway<S>{
    validateData<T>(data:T,schema:S):Promise<T>;
}