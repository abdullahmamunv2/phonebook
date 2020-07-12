
export default interface IGoogleIdTokenParser<E>{
    parse(token:string):Promise<E>;
}