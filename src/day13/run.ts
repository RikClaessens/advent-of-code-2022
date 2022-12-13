import assert, { deepEqual } from 'node:assert';
import test from 'node:test';
import { getInputAsString } from '../util';

const day = 'day13';
const testInput = getInputAsString(`src/${day}/test.txt`);
const input = getInputAsString(`src/${day}/input.txt`);

type PacketElement = number | [] | number[] | PacketElement[];
type Pairs = { left: PacketElement; right: PacketElement }[];

const compare = (left: PacketElement, right: PacketElement): number => {
  if (typeof left === 'number' && typeof right === 'number') {
    return left === right ? 0 : left < right ? -1 : 1;
  } else if (typeof left === 'number') {
    return compare([left], right as PacketElement);
  } else if (typeof right === 'number') {
    return compare(left as PacketElement, [right]);
  } else {
    const minLengthLists = Math.min(left.length, right.length);
    for (let i = 0; i < minLengthLists; i += 1) {
      const isInOrderResult = compare(left[i], right[i]);
      if (isInOrderResult !== 0) return isInOrderResult;
    }
    return left.length < right.length ? -1 : right.length < left.length ? 1 : 0;
  }
};

const run = (input: string): number => {
  const pairs: Pairs = input.split('\n\n').map((pair) => ({
    left: JSON.parse(pair.split('\n')[0]) as PacketElement,
    right: JSON.parse(pair.split('\n')[1]) as PacketElement,
  }));
  let inOrderPairs: number[] = [];
  pairs.forEach((pair, pairIndex) => {
    const pairIsInOrder = compare(pair.left, pair.right);
    if (pairIsInOrder === -1) {
      inOrderPairs.push(pairIndex + 1);
    }
  });
  const sumOfInOrderPairsIndexes = inOrderPairs.reduce(
    (total, index) => total + index,
    0,
  );
  return sumOfInOrderPairsIndexes;
};

const run2 = (input: string): number => {
  const packets: PacketElement[] = input
    .split('\n\n')
    .map((pair) => [
      JSON.parse(pair.split('\n')[0]) as PacketElement,
      JSON.parse(pair.split('\n')[1]) as PacketElement,
    ]);
  const divider1 = [[2]];
  const divider2 = [[6]];
  const sortedPackets = [...packets.flat(), divider1, divider2].sort(compare);
  let indexOfDivider1 = -1;
  let indexOfDivider2 = -1;

  for (let i = 0; i < sortedPackets.length; i += 1) {
    if (JSON.stringify(divider1) === JSON.stringify(sortedPackets[i])) {
      indexOfDivider1 = i + 1;
    }
    if (JSON.stringify(divider2) === JSON.stringify(sortedPackets[i])) {
      indexOfDivider2 = i + 1;
    }
  }

  return indexOfDivider1 * indexOfDivider2;
};

test('part 1', () => {
  assert.strictEqual(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]), -1, '1');
  assert.strictEqual(compare([[1], [2, 3, 4]], [[1], 4]), -1, '2');
  assert.strictEqual(compare([9], [[8, 7, 6]]), 1, '3');
  assert.strictEqual(compare([[4, 4], 4, 4], [[4, 4], 4, 4, 4]), -1, '4');
  assert.strictEqual(compare([7, 7, 7, 7], [7, 7, 7]), 1, '5');
  assert.strictEqual(compare([], [3]), -1, '6');
  assert.strictEqual(compare([[[]]], [[]]), 1, '7');
  assert.strictEqual(
    compare(
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
    ),
    1,
    '8',
  );
  assert.strictEqual(compare([[1], 4], [[1], [4, 3, 4]]), -1, '9');
  assert.strictEqual(run(testInput), 13);
});

test('part 2', () => {
  assert.strictEqual(run2(testInput), 140);
});

(() => {
  console.log('Part 1: ' + run(input));
  console.log('Part 2: ' + run2(input));
})();
