import { hasPart } from './hasPart';
import { When } from './When';

test('part calls matcher with every part of a sentence', () => {
  const mockWhen: jest.Mocked<When> = jest.fn();

  hasPart(mockWhen)('this is. a test');

  expect(mockWhen).toHaveBeenCalledWith('this');
  expect(mockWhen).toHaveBeenCalledWith('this is.');
  expect(mockWhen).toHaveBeenCalledWith('this is. a');
  expect(mockWhen).toHaveBeenCalledWith('this is. a test');
  expect(mockWhen).toHaveBeenCalledWith('is.');
  expect(mockWhen).toHaveBeenCalledWith('is. a');
  expect(mockWhen).toHaveBeenCalledWith('is. a test');
  expect(mockWhen).toHaveBeenCalledWith('a');
  expect(mockWhen).toHaveBeenCalledWith('a test');
  expect(mockWhen).toHaveBeenCalledWith('test');
  expect(mockWhen).toHaveBeenCalledTimes(10);
});

test('part calls matcher with empty string', () => {
  const mockWhen: jest.Mocked<When> = jest.fn();

  hasPart(mockWhen)('');

  expect(mockWhen).toHaveBeenCalledWith('');
  expect(mockWhen).toHaveBeenCalledTimes(1);
});
