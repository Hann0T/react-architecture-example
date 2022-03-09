export class ProductOutOfStockError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductOutOfStockError.prototype);
  }
}
