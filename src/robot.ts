import { Arena } from './arena';
import type { Commands, Heading, Point } from './types';

type Status = 'ok' | 'error' | 'crash';

interface Output {
  status: Status;
  location: Point;
  heading: Heading;
  path: Commands;
}

export class Robot {
  private status: Status = 'ok';
  private path: Commands = [];

  constructor(private position: Point, private heading: Heading, private arena: Arena) {
    if (!this.arena.isPointInside(position)) {
      this.status = 'error';
      throw new Error('Starting location is outside of the arena');
    }
  }

  private turn(direction: 'left' | 'right'): void {
    const headings: Heading[] = ['north', 'east', 'south', 'west'];
    const currentIndex = headings.indexOf(this.heading);

    this.heading = direction === 'left' ? headings[(currentIndex + 3) % 4] : headings[(currentIndex + 1) % 4];
  }

  private move(): void {
    const newPosition = { ...this.position };

    switch (this.heading) {
      case 'north':
        newPosition.y += 1;
        break;
      case 'east':
        newPosition.x += 1;
        break;
      case 'south':
        newPosition.y -= 1;
        break;
      case 'west':
        newPosition.x -= 1;
        break;
    }

    if (this.arena.isPointInside(newPosition)) {
      this.position = newPosition;
    } else {
      this.status = 'crash';
      console.error(`Robot crashed moving to '${JSON.stringify(newPosition, null, 0)}'`);
    }
  }

  public run(commands: Commands): void {
    for (const command of commands) {
      if (this.status === 'crash') break;

      this.path.push(command);

      switch (command) {
        case 'forward':
          this.move();
          break;
        case 'left':
        case 'right':
          this.turn(command);
          break;
        default:
          this.status = 'error';
          console.error(`Unknown command '${command}'`);
      }
    }
  }

  public getOutput(): Output {
    return {
      status: this.status,
      location: this.position,
      heading: this.heading,
      path: this.path,
    };
  }
}
