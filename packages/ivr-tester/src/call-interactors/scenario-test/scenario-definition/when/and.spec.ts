import { expect, test } from 'vitest';
import { and } from './and.js';
import { contains } from './contains.js';

test('passes if both conditions match', () => {
  expect(and(contains('this'), contains('test'))('this is a test')).toBe(true);
});

test('fails if either condition does not match', () => {
  expect(and(contains('hello'), contains('test'))('this is a test')).toBe(false);
});
