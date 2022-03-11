import { LocalStorageRepository } from 'framework/outputAdapters/LocalStorageRepository';

class fakeLocalStorage {
  private store: any = {};

  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: any) {
    this.store[key] = value.toString();
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe('Local Storage Cart Repository test', () => {
  let localStorageKey = 'TEST_KEY_V1';
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new fakeLocalStorage(),
    });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('can store items', () => {
    const repository = new LocalStorageRepository(localStorageKey);
    const item = {
      name: 'item',
    };

    repository.storeItem(item);

    expect(repository.getItems()).toContainEqual(item);
  });

  test('can update items', () => {
    const repository = new LocalStorageRepository(localStorageKey);
    const item = { id: '123', name: 'item' };
    const newItem = { id: '1234213', name: 'newItemEdited' };

    repository.storeItem(item);
    repository.updateItem(item.id, newItem);

    expect(repository.getItems()).toContainEqual(newItem);
    expect(repository.getItems()).toHaveLength(1);
  });

  test('can delete an item', () => {
    const item = { id: '123', name: 'item' };
    const repository = new LocalStorageRepository(localStorageKey);

    repository.storeItem(item);
    expect(repository.getItems()).toContainEqual(item);

    repository.deleteItem(item.id);
    expect(repository.getItems()).toHaveLength(0);
  });
});
