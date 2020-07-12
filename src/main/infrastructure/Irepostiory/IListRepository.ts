
export default interface IListRepository<T,QUERY> {
    readAll(query:QUERY):Promise<T[]|null>;
}