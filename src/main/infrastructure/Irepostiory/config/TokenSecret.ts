

export default interface TokenSecret{
    publicKey   : Buffer;
    privateKey  : Buffer;
    alg         : string;
    secret      : string;
}