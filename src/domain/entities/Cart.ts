import { Item } from '@domain/entities/Item';

export class Cart {
  items: Array<Item> = [];

  addItem(item: Item): void {
    if (this.items.includes(item)) return;
    this.items.push(item);
  }

  getItems(): Array<Item> {
    return this.items;
  }
}
