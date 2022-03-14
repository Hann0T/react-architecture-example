import { DataPersistenceOutputPort } from 'dataPersistence/DataPersistenceOutputPort';

export class FakeLocalStorageRepository implements DataPersistenceOutputPort {
  private items: any[] = [];
  storeItem<T>(item: T): void {
    this.items.push(item);
  }
  getItems<T>(): T[] {
    return this.items;
  }
  updateItem<S, T>(id: S, newItem: T): void {
    let index = this.items.findIndex((item) => item.id === id);
    this.items.splice(index, 1, newItem);
  }
  deleteItem<T>(id: T): void {
    let index = this.items.findIndex((item) => item.id === id);
    this.items.splice(index, 1);
  }
}
