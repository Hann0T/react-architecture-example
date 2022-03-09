export class Product {
  name: string;
  price: number;
  stock: number;
  constructor(name: string, price: number, stock: number) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
