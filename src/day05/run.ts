import assert from 'node:assert';
import test from 'node:test';
import { getInput } from '../util';

const day = 'day05';
const testInput = getInput(`src/${day}/test.txt`);
const input = getInput(`src/${day}/input.txt`);

const parseInputToStacks = (input: string[]): string[][] => {
  const numberOfStacks = Number.parseInt(
    input
      .find((line) => line.startsWith(' 1'))
      ?.split(' ')
      .filter((x) => x)
      .reverse()[0] as string,
  );

  let crates: string[][] = [];
  let line = 0;
  while (!input[line].startsWith(' 1')) {
    for (var i = 0; i < numberOfStacks; i += 1) {
      const crate = input[line][1 + i * 4];
      if (crate !== ' ') {
        if (!crates[i]) {
          crates[i] = [];
        }
        crates[i].unshift(crate);
      }
    }

    line += 1;
  }
  return crates;
};

type Move = {
  move: number;
  from: number;
  to: number;
};

const parseInputToMoves = (input: string[]): Move[] =>
  input
    .filter((line) => line.startsWith('move'))
    .map((line) => ({
      move: Number.parseInt(line.match(/move ([0-9]*)/)?.[1] || ''),
      from: Number.parseInt(line.match(/from ([0-9]*)/)?.[1] || ''),
      to: Number.parseInt(line.match(/to ([0-9]*)/)?.[1] || ''),
    }));

const doMoves = (
  stacks: string[][],
  moves: Move[],
  moveSingleStack?: boolean,
): string[][] => {
  moves.forEach(({ move, from, to }) => {
    let cratesToMove = [];
    for (var i = 0; i < move; i += 1) {
      cratesToMove.push(stacks[from - 1].pop());
    }
    if (moveSingleStack) cratesToMove.reverse();
    cratesToMove.forEach(
      (crateToMove) => crateToMove && stacks[to - 1].push(crateToMove),
    );
  });
  return stacks;
};

const part1 = (input: string[]): string =>
  doMoves(parseInputToStacks(input), parseInputToMoves(input)).reduce(
    (outcome, stack) => outcome + stack.pop(),
    '',
  );

const part2 = (input: string[]): string =>
  doMoves(parseInputToStacks(input), parseInputToMoves(input), true).reduce(
    (outcome, stack) => outcome + stack.pop(),
    '',
  );

test('part 1', () => {
  assert.deepEqual(parseInputToStacks(testInput), [
    ['Z', 'N'],
    ['M', 'C', 'D'],
    ['P'],
  ]);
  assert.deepEqual(parseInputToMoves(testInput), [
    { move: 1, from: 2, to: 1 },
    { move: 3, from: 1, to: 3 },
    { move: 2, from: 2, to: 1 },
    { move: 1, from: 1, to: 2 },
  ]);
  assert.strictEqual(part1(testInput), 'CMZ');
});

test('part 2', () => {
  assert.strictEqual(part2(testInput), 'MCD');
});

(() => {
  console.log('Part 1: ' + part1(input));
  console.log('Part 2: ' + part2(input));
})();
