export class ProductHasAlreadyBeenAddedError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductHasAlreadyBeenAddedError.prototype);
  }
}
