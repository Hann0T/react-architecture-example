export interface DataPersistenceOutputPort {
  storeItem<T>(item: T): void;
  getItems<T>(): T[];
  updateItem<S, T>(id: S, newItem: T): void;
  deleteItem<T>(id: T): void;
}
