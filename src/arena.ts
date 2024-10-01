import type { Point } from './types';

export class Arena {
  constructor(private corner1: Point, private corner2: Point) {
    if (!this.isValid()) {
      throw new Error('Invalid arena dimensions');
    }
  }

  public isValid(): boolean {
    return this.corner1.x < this.corner2.x && this.corner1.y < this.corner2.y;
  }

  public isPointInside(point: Point): boolean {
    return (
      point.x >= this.corner1.x && point.x <= this.corner2.x && point.y >= this.corner1.y && point.y <= this.corner2.y
    );
  }
}
