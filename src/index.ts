import { readFileSync, writeFileSync } from 'fs';
import { Arena } from './arena';
import { Robot } from './robot';
import type { Commands, Heading, Point } from './types';

interface Config {
  arena: {
    corner1: Point;
    corner2: Point;
  };
  location: Point;
  heading: Heading;
  directions: Commands;
}

export function runWith(config: Config | null) {
  if (!config) return;

  const { corner1, corner2 } = config.arena;
  const myArena = new Arena(corner1, corner2);
  const { location, heading, directions } = config;
  const myRobot = new Robot(location, heading, myArena);

  myRobot.run(directions);

  const output = myRobot.getOutput();

  writeFileSync('./dist/robot.json', JSON.stringify(output, null, 2));

  return output;
}

function readConfig(filePath: string): Config | null {
  try {
    const data = readFileSync(filePath, 'utf8');

    return JSON.parse(data);
  } catch (error) {
    console.error(error);

    return null;
  }
}

const configFilePath = process.argv[2];
const config = readConfig(configFilePath);

runWith(config);
