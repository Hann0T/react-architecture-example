import { ProductId } from 'product/ProductId';

export class Product {
  id: ProductId;
  name: string;
  price: number;
  stock: number;
  constructor(name: string, price: number, stock: number, id: ProductId) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
