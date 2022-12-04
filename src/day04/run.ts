import assert from 'node:assert';
import test from 'node:test';
import { getInput } from '../util';

const day = 'day04';
const testInput = getInput(`src/${day}/test.txt`);
const input = getInput(`src/${day}/input.txt`);

type Pair = {
  min: number;
  max: number;
};

const parseInputToPairs = (input: string[]): { pair1: Pair; pair2: Pair }[] =>
  input.map((pairs) => {
    const pairsSplit = pairs.split(',');
    const pair1 = {
      min: Number.parseInt(pairsSplit[0].split('-')[0]),
      max: Number.parseInt(pairsSplit[0].split('-')[1]),
    };
    const pair2 = {
      min: Number.parseInt(pairsSplit[1].split('-')[0]),
      max: Number.parseInt(pairsSplit[1].split('-')[1]),
    };
    return { pair1, pair2 };
  });

const doPairsFullyOverlap = (pair1: Pair, pair2: Pair): boolean =>
  (pair1.min >= pair2.min && pair1.max <= pair2.max) ||
  (pair2.min >= pair1.min && pair2.max <= pair1.max);

const doesPair1OverLapPair2 = (pair1: Pair, pair2: Pair): boolean =>
  (pair1.min >= pair2.min && pair1.min <= pair2.max) ||
  (pair1.max >= pair2.min && pair1.max <= pair2.max);

const doPairsOverlap = (pair1: Pair, pair2: Pair): boolean =>
  doesPair1OverLapPair2(pair1, pair2) || doesPair1OverLapPair2(pair2, pair1);

const part1 = (input: string[]): number =>
  parseInputToPairs(input).reduce(
    (totalOverlappingPairs: number, pairs) =>
      totalOverlappingPairs +
      (doPairsFullyOverlap(pairs.pair1, pairs.pair2) ? 1 : 0),
    0,
  );

const part2 = (input: string[]): number =>
  parseInputToPairs(input).reduce(
    (totalOverlappingPairs: number, pairs) =>
      totalOverlappingPairs +
      (doPairsOverlap(pairs.pair1, pairs.pair2) ? 1 : 0),
    0,
  );

test('part 1', () => {
  assert.strictEqual(
    doPairsFullyOverlap({ min: 2, max: 8 }, { min: 3, max: 7 }),
    true,
  );
  assert.strictEqual(
    doPairsFullyOverlap({ min: 2, max: 8 }, { min: 3, max: 9 }),
    false,
  );
  assert.strictEqual(
    doPairsFullyOverlap({ min: 1, max: 2 }, { min: 3, max: 4 }),
    false,
  );
  assert.strictEqual(
    doPairsFullyOverlap({ min: 1, max: 2 }, { min: 2, max: 2 }),
    true,
  );
  assert.strictEqual(part1(testInput), 2);
});

test('part 2', () => {
  assert.strictEqual(
    doPairsOverlap({ min: 1, max: 2 }, { min: 2, max: 3 }),
    true,
    'overlap 1',
  );
  assert.strictEqual(
    doPairsOverlap({ min: 1, max: 2 }, { min: 3, max: 3 }),
    false,
    'overlap 2',
  );
  assert.strictEqual(part2(testInput), 4);
});

(() => {
  console.log('Part 1: ' + part1(input));
  console.log('Part 2: ' + part2(input));
})();
