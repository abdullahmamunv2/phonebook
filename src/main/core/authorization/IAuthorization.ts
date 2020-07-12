

/**
 * @param request : Authorization header
 * @param scopes  : Defined scopes 
 */
export default interface IAuthorization<U,V> {
    authorize(request:U,scopes :string[]):Promise<V>
}