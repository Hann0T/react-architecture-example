import { Item } from '@domain/entities/Item';
import { ItemId } from '@domain/valueObjects/ItemId';

export class Cart {
  static instance: Cart;
  private cartContent: Item[] = [];

  static getInstance(): Cart {
    if (!Cart.instance) Cart.instance = new Cart();
    return this.instance;
  }

  addItemToCart(newItem: Item): void {
    const itemExists = this.cartContent.find((item) => item.id === newItem.id);
    if (!itemExists) this.cartContent.push(newItem);
  }

  removeItemFromCart(id: ItemId): Item[] {
    const itemIndex = this.cartContent.findIndex((item) => item.id === id);
    return this.cartContent.splice(itemIndex, 1);
  }

  getItems(): Item[] {
    return this.cartContent;
  }
}
