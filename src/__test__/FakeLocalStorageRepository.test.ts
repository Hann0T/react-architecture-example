import { FakeLocalStorageRepository } from 'framework/outputAdapters/FakeLocalStorageRepository';

describe('Fake Repository test', () => {
  test('can store items', () => {
    const item = {
      name: 'item',
    };
    const repository = new FakeLocalStorageRepository();

    repository.storeItem(item);

    expect(repository.getItems()).toContainEqual(item);
  });

  test('can update items', () => {
    const item = { id: '1234', name: 'item' };
    const repository = new FakeLocalStorageRepository();

    repository.storeItem(item);
    expect(repository.getItems()).toContainEqual(item);

    const newItem = { id: '4321', name: 'newItemEdited' };
    repository.updateItem(item.id, newItem);
    expect(repository.getItems()).toContainEqual(newItem);
    expect(repository.getItems()).toHaveLength(1);
  });

  test('can delete items', () => {
    const item = { id: '1234', name: 'item' };
    const repository = new FakeLocalStorageRepository();

    repository.storeItem(item);
    expect(repository.getItems()).toContainEqual(item);

    repository.deleteItem(item.id);
    expect(repository.getItems()).toHaveLength(0);
  });
});
