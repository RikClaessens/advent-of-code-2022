import assert from 'node:assert';
import test from 'node:test';
import { getInput } from '../util';

const day = 'day02';
const testInput = getInput(`src/${day}/test.txt`);
const input = getInput(`src/${day}/input.txt`);

/*
A: Rock
B: Paper
C: Scissors

X: Rock 1
Y: Paper 2
Z: Scissors 3
*/

const win = 6;
const draw = 3;
const loss = 0;

enum Outcomes {
  'A X' = draw,
  'A Y' = win,
  'A Z' = loss,
  'B X' = loss,
  'B Y' = draw,
  'B Z' = win,
  'C X' = win,
  'C Y' = loss,
  'C Z' = draw,
}

enum HandScores {
  X = 1,
  Y = 2,
  Z = 3,
}

const getScore = (games: string[]): number =>
  games.reduce(
    (totalScore, game) =>
      totalScore +
      Outcomes[game as keyof typeof Outcomes] +
      HandScores[game[2] as keyof typeof HandScores],
    0,
  );

enum StrategyHandScores {
  'A X' = HandScores.Z, // Rock Scissors -> loss
  'A Y' = HandScores.X, // Rock Rock -> draw
  'A Z' = HandScores.Y, // Rock Paper - > win
  'B X' = HandScores.X, // Paper Rock -> loss
  'B Y' = HandScores.Y, // Paper Paper -> draw
  'B Z' = HandScores.Z, // Paper Scissors - > win
  'C X' = HandScores.Y, // Scissors Paper -> loss
  'C Y' = HandScores.Z, // Scissors Scissors -> draw
  'C Z' = HandScores.X, // Scissors Rock - > win
}

enum StategyOutcomes {
  X = loss,
  Y = draw,
  Z = win,
}

const getScorePart2 = (games: string[]): number => {
  return games.reduce(
    (totalScore, game) =>
      totalScore +
      StategyOutcomes[game[2] as keyof typeof StategyOutcomes] +
      StrategyHandScores[game as keyof typeof StrategyHandScores],
    0,
  );
};

test('part 1', () => {
  assert.strictEqual(getScore(testInput), 15);
});

test('part 2', () => {
  assert.strictEqual(getScorePart2(testInput), 12);
});

(() => {
  console.log('Part 1: ' + getScore(input));
  console.log('Part 2: ' + getScorePart2(input));
})();
