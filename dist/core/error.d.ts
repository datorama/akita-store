export declare class AkitaError extends Error {
    constructor(message: string);
}
export declare class AkitaImmutabilityError extends AkitaError {
    constructor(prevState: any);
}
