
export default interface IRepository<T,KEY> {
    read(id:KEY):Promise<T | undefined>;
    create(entity:T) : Promise<T>;
    update(entity:T) :Promise<T>;
    delete(entity:T) :Promise<boolean>;
}