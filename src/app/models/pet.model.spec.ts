import { Pet } from './pet.model';

describe('Pets', () => {
  it('should create an instance', () => {
    expect(new Pet()).toBeTruthy();
  });
});
