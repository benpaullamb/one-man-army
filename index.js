import robot from 'robotjs';
import chalk from 'chalk';
import logUpdate from 'log-update';
import readline from 'readline';
import { stdin, stdout } from 'process';

// TODO:
// 1. Has + button prompt
// Click off the screen first
// Randomiser

const reactionsRelativeX = {
  like: 50,
  love: 100,
  clap: 130,
  laugh: 170,
  shock: 215
};

const reactionsRelativeY = 55;

const reactionsPos = {
  x: 1075, // 1075 / 1130
  y: 65
};

robot.setKeyboardDelay(0);

const millionClick = () => {
  console.log(chalk.yellow(`Clicking for ${duration}s`));
  const startTime = Date.now();
  let count = 0;
  while(Date.now() - startTime < (duration * 1000)) {
    robot.mouseClick();
    count++;
    logUpdate(chalk.yellowBright(`Clicked ${count} times!`));
  }
};

const hoverReaction = (reactionName) => {
  console.log(chalk.yellow(`Moving to "${reactionName}" reaction`));
  robot.moveMouse(reactionsPos.x, reactionsPos.y);
  robot.mouseClick();
  const x = reactionsRelativeX[reactionName];
  robot.moveMouse(reactionsPos.x + x, reactionsPos.y + reactionsRelativeY);
};

const askUser = (question) => {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  return new Promise((res, rej) => {
    rl.question(question, (answer) => {
      res(answer);
      rl.close();
    });
  });
};

const promptReaction = async () => {
  const options = Object.keys(reactionsRelativeX).map((react, i) => `${i + 1}. ${react}`).join('\n');
  const reactionIndex = await askUser(`Select a reaction (default: "like"):\n${options}\n`);

  let reaction = 'like';
  if(reactionIndex) {
    [reaction] = Object.entries(reactionsRelativeX).find((_, i) => Number(reactionIndex) - 1 === i);
  }
  return reaction;
};

const promptDuration = async () => {
  const durationText = await askUser(`Enter a duration (default: 5s)? `);
  return durationText ? Number(durationText) : 5;
};

console.log(chalk.bgYellow('One Man Army'));

const reaction = await promptReaction();
const duration = await promptDuration();

hoverReaction(reaction);
  
millionClick();

console.log(chalk.yellow('Done.'));