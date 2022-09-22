import robot from 'robotjs';
import logUpdate from 'log-update';
import chalk from 'chalk';

let samePosCount = 0;
let lastPos = { x: 0, y: 0 };
const savedPos = [];

const interval = 100;
setInterval(() => {
  const { x, y } = robot.getMousePos();
  
  const savedPosText = savedPos.map(posToString).join(', ');
  logUpdate(`${chalk.bold(posToString({ x, y }))} - Saved: ${chalk.blue(savedPosText)}`);

  manageSavedPos(x, y);
}, interval);

const manageSavedPos = (x, y) => {
  samePosCount = lastPos.x === x && lastPos.y === y ? samePosCount + 1 : 1;

  const timeInSamePos = samePosCount * interval;
  if(timeInSamePos >= 3000) {
    savedPos.push({ x, y });
    samePosCount = 0;
  }
  
  lastPos = { x, y };
};

const posToString = (pos) => `(${pos.x}, ${pos.y})`;