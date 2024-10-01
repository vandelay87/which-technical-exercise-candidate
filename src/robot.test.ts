import { describe, expect, test } from '@jest/globals';
import { Arena } from './arena';
import { Robot } from './robot';
import type { Point, Commands } from './types';

describe('Robot)', () => {
  const corner1: Point = { x: -3, y: -3 };
  const corner2: Point = { x: 3, y: 3 };
  const newArena = new Arena(corner1, corner2);
  const startLocation: Point = { x: 0, y: 0 };

  test('robot follows path successfully', () => {
    const newRobot = new Robot(startLocation, 'north', newArena);
    const expectedPath: Commands = ['forward', 'right', 'forward', 'forward'];
    const expectedPosition: Point = { x: 2, y: 1 };

    newRobot.run(expectedPath);

    expect(newRobot.getOutput()).toStrictEqual({
      status: 'ok',
      location: expectedPosition,
      heading: 'east',
      path: expectedPath,
    });
  });

  test('robot follows path and crashes', () => {
    const newRobot = new Robot(startLocation, 'north', newArena);
    const expectedPath: Commands = ['forward', 'forward', 'forward', 'forward'];
    const expectedPosition = { x: 0, y: 3 };

    newRobot.run(expectedPath);

    expect(newRobot.getOutput()).toStrictEqual({
      status: 'crash',
      location: expectedPosition,
      heading: 'north',
      path: expectedPath,
    });
  });

  test('errors if given invalid command', () => {
    const newRobot = new Robot(startLocation, 'north', newArena);
    const expectedPath: string[] = ['forward', 'jump'];
    const expectedPosition = { x: 0, y: 1 };

    newRobot.run(expectedPath as Commands);

    expect(newRobot.getOutput()).toStrictEqual({
      status: 'error',
      location: expectedPosition,
      heading: 'north',
      path: expectedPath,
    });
  });
});
