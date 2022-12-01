import assert from 'node:assert';
import test from 'node:test';
import { getInputAsString } from '../util';

const day = 'day01';
const testInput = getInputAsString(`src/${day}/test.txt`);
const input = getInputAsString(`src/${day}/input.txt`);

const topXTotalCalories = (foodList: string, top: number) => {
  return foodList
    .split('\n\n')
    .map((elfFoodList) =>
      elfFoodList
        .split('\n')
        .map((foodItem) => Number.parseInt(foodItem))
        .reduce((totalCal, foodItemCal) => totalCal + foodItemCal, 0),
    )
    .sort((a, b) => b - a)
    .slice(0, top)
    .reduce((total, calories) => (total += calories), 0);
};

test('part 1', () => {
  assert.strictEqual(topXTotalCalories(testInput, 1), 24000);
});

test('part 2', () => {
  assert.strictEqual(topXTotalCalories(testInput, 3), 45000);
});

(() => {
  console.log('Part 1: ' + topXTotalCalories(input, 1));
  console.log('Part 2: ' + topXTotalCalories(input, 3));
})();
