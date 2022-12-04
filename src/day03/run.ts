import assert from 'node:assert';
import test from 'node:test';
import { getInput } from '../util';

const day = 'day03';
const testInput = getInput(`src/${day}/test.txt`);
const input = getInput(`src/${day}/input.txt`);

const getPrio = (letter: string): number =>
  letter.charCodeAt(0) - (letter.toLowerCase() === letter ? 96 : 38);

const sumOfPrios = (rucksacks: string[]): number =>
  rucksacks
    .map((rucksack) => {
      const firstCompartment = rucksack.slice(0, rucksack.length / 2);
      const secondCompartment = rucksack.slice(rucksack.length / 2);
      const duplicateLetter = firstCompartment
        .split('')
        .find((letter) => secondCompartment.indexOf(letter) >= 0);

      return duplicateLetter ? getPrio(duplicateLetter) : 0;
    })
    .reduce((total, prio) => total + prio, 0);

const sumOfPriosPart2 = (rucksacks: string[]): number => {
  let sumOfPrios = 0;
  for (var i = 0; i < rucksacks.length; i += 3) {
    const duplicateLetter = rucksacks[i]
      .split('')
      .find(
        (letter) =>
          rucksacks[i + 1].indexOf(letter) >= 0 &&
          rucksacks[i + 2].indexOf(letter) >= 0,
      );
    sumOfPrios += duplicateLetter ? getPrio(duplicateLetter) : 0;
  }

  return sumOfPrios;
};

test('part 1', () => {
  assert.strictEqual(getPrio('a'), 1);
  assert.strictEqual(getPrio('z'), 26);
  assert.strictEqual(getPrio('A'), 27);
  assert.strictEqual(getPrio('Z'), 52);
  assert.strictEqual(sumOfPrios(testInput), 157);
});

test('part 2', () => {
  assert.strictEqual(sumOfPriosPart2(testInput), 70);
});

(() => {
  console.log('Part 1: ' + sumOfPrios(input));
  console.log('Part 2: ' + sumOfPriosPart2(input));
})();
