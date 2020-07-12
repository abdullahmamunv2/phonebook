

export default interface ITokenParser<E>{
    parse(token:string):Promise<E>;
}