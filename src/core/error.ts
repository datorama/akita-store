export class AkitaError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AkitaImmutabilityError extends AkitaError {
  constructor(prevState) {
    super(`The new state should be immutable. Make sure to return a new immutable state. \n state: \n ${prevState}`);
  }
}