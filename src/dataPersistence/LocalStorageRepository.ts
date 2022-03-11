import { DataPersistenceOutputPort } from '@application/outputPorts/DataPersistenceOutputPort';

export class LocalStorageRepository implements DataPersistenceOutputPort {
  private localStorageKey: string;

  constructor(localStorageName: string) {
    this.localStorageKey = localStorageName;
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  storeItem<T>(item: T): void {
    let items = this.getItems();

    if (!items) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([item]));
      return;
    }

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify([...items, item]),
    );
  }

  getItems<T>(): T[] {
    let items = localStorage.getItem(this.localStorageKey);
    return JSON.parse(items || '');
  }

  updateItem<S, T>(id: S, newItem: T): void {
    let items = this.getItems<T>();
    //@ts-ignore
    let index = items.findIndex((item) => item.id === id);

    items.splice(index, 1, newItem);
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }

  deleteItem<T>(id: T): void {
    let items = this.getItems();
    //@ts-ignore
    let index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);

    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }
}
