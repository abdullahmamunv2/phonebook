export  interface Interactor<T,E> {
    execute(request:T) : Promise<E>;
}