import {
    AuthorizationError
} from '@core/errors'


import {
    inject,
    injectable
} from '@core/di'
import IScopeGateway from './IScopeGateway'

@injectable()
export default class TokenScopeGateway implements IScopeGateway {
    get(resourceId: string): Promise<string[]> {
        return Promise.resolve(['profile','email'])
    }

}