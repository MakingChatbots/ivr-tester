import { and } from './and';
import { contains } from './contains';

test('passes if both conditions match', () => {
  expect(and(contains('this'), contains('test'))('this is a test')).toBe(true);
});

test('fails if either condition does not match', () => {
  expect(and(contains('hello'), contains('test'))('this is a test')).toBe(false);
});
