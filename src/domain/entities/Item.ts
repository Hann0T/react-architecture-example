import { ItemId } from '@domain/valueObjects/ItemId';

export class Item {
  id: ItemId;
  name: string;
  price: number;

  constructor(id: ItemId, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
