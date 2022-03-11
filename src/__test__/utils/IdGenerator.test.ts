import { IdGenerator } from 'utils/IdGenerator';

test('The generated ID is 20 characters long', () => {
  let uniqueId = IdGenerator.generateId();

  expect(uniqueId).toHaveLength(20);
});
