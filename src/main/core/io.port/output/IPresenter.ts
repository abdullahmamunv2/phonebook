export interface IPresenter<T,E> {
    present(response:T) : E;
}