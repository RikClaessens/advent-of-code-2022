import assert from 'node:assert';
import test from 'node:test';
import { getInput } from '../util';

const day = 'day08';
const testInput = getInput(`src/${day}/test.txt`);
const input = getInput(`src/${day}/input.txt`);

const scanTree = (forest: string[], x: number, y: number) => {
  let visible = {
    left: true,
    top: true,
    right: true,
    bottom: true,
  };
  let distances = {
    left: x,
    top: y,
    right: forest[x].length - x - 1,
    bottom: forest.length - y - 1,
  };
  // check left
  for (var dx = 1; dx <= x; dx += 1) {
    if (forest[y][x - dx] >= forest[y][x]) {
      visible.left = false;
      distances.left = dx;
      break;
    }
  }
  // check top
  for (var dy = 1; dy <= y; dy += 1) {
    if (forest[y - dy][x] >= forest[y][x]) {
      visible.top = false;
      distances.top = dy;
      break;
    }
  }
  // check right
  for (var dx = 1; x + dx < forest[x].length; dx += 1) {
    if (forest[y][x + dx] >= forest[y][x]) {
      visible.right = false;
      distances.right = dx;
      break;
    }
  }
  // check bottom
  for (var dy = 1; y + dy < forest.length; dy += 1) {
    if (forest[y + dy][x] >= forest[y][x]) {
      visible.bottom = false;
      distances.bottom = dy;
      break;
    }
  }
  return {
    visible: visible.left || visible.top || visible.right || visible.bottom,
    scenicScore:
      distances.left * distances.top * distances.right * distances.bottom,
  };
};

const countVisibleTrees = (forest: string[]): number => {
  let numberOfTreesVisible = 0;
  for (var y = 1; y < forest[0].length - 1; y += 1) {
    for (var x = 1; x < forest.length - 1; x += 1) {
      const tree = scanTree(forest, x, y);
      numberOfTreesVisible += tree.visible ? 1 : 0;
    }
  }
  const numberOfTreesOnTheEdge =
    2 * (forest.length - 1 + (forest[0].length - 1));
  return numberOfTreesVisible + numberOfTreesOnTheEdge;
};

const getMaxScenicScore = (forest: string[]): number => {
  let max = Number.MIN_VALUE;
  for (var y = 1; y < forest[0].length - 1; y += 1) {
    for (var x = 1; x < forest.length - 1; x += 1) {
      const tree = scanTree(forest, x, y);
      max = Math.max(tree.scenicScore, max);
    }
  }
  return max;
};

test('part 1', () => {
  assert.strictEqual(countVisibleTrees(testInput), 21);
});

test('part 2', () => {
  assert.strictEqual(getMaxScenicScore(testInput), 8);
});

(() => {
  console.log('Part 1: ' + countVisibleTrees(testInput));
  console.log('Part 2: ' + getMaxScenicScore(input));
})();
