

export default interface IScopeGateway{
    get(resourceId: string): Promise<string[]>
}