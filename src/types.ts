export interface Point {
  x: number;
  y: number;
}

export type Heading = 'north' | 'east' | 'south' | 'west';

export type Commands = Array<'forward' | 'left' | 'right'>;
