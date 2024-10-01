import { describe, expect, test } from '@jest/globals';
import { Arena } from './arena';
import type { Point } from './types';

describe('Arena', () => {
  const corner1: Point = { x: -3, y: -3 };
  const corner2: Point = { x: 3, y: 3 };
  const newArena = new Arena(corner1, corner2);

  test('creates arena successfully', () => {
    expect(newArena.isValid()).toBeTruthy();
  });

  test('validates if point is inside arena', () => {
    const insidePoint: Point = { x: -1, y: -2 };
    const outsidePoint: Point = { x: 5, y: -1 };

    expect(newArena.isPointInside(insidePoint)).toBeTruthy();
    expect(newArena.isPointInside(outsidePoint)).not.toBeTruthy();
  });

  test('throws error if coordinates are invalid', () => {
    const corner1: Point = { x: 3, y: 3 };
    const corner2: Point = { x: 1, y: -3 };

    expect(() => new Arena(corner1, corner2)).toThrowError('Invalid arena dimensions');
  });
});
