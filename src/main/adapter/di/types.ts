
export const TYPE : any = {
    
}

TYPE.INTERACTOR = {
    EXECUTOR            : Symbol.for('InteractorExecutor'),
    CONTACT_CREATE      : Symbol.for('Interactor<ContactRequest,ContactResponse>'),
    CONTACT_READ        : Symbol.for('Interactor<string,ContactResponse>'),
    CONTACT_EDIT        : Symbol.for('ContactEditInteractor'),
    CONTACT_DELETE      : Symbol.for('ContactDeleteInteractor'),
    CONTACT_LIST        : Symbol.for('ContactListInteractor')
}

TYPE.PRESENTER = {
    ERROR : Symbol.for('ErrorPresenter'),
    CONTACT_CREATE      : Symbol.for('ContactCreatePresenter'),
    CONTACT_DELETE      : Symbol.for('ContactDeletePresenter'),
    CONTACT_LIST        : Symbol.for('ContactListPresenter')
}