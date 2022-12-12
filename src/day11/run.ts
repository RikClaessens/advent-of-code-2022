import assert from 'node:assert';
import test from 'node:test';
import { getInputAsString } from '../util';

const day = 'day11';
const testInput = getInputAsString(`src/${day}/test.txt`);
const input = getInputAsString(`src/${day}/input.txt`);

const getMonkeys = (input: string) =>
  input
    .split('\n\n')
    .map((monkey) => monkey.split('\n'))
    .map((monkey) => ({
      items: monkey[1]
        .substring(' Starting items: '.length)
        .split(',')
        .map((x) => input.split('\n\n').map((_m) => Number.parseInt(x))),
      operation: monkey[2].substring('  Operation: new = '.length).split(' '),
      divisible: Number.parseInt(
        monkey[3].substring('  Test: divisible by '.length),
      ),
      toMonkeyIfTrue: Number.parseInt(
        monkey[4].substring('    If true: throw to monkey '.length),
      ),
      toMonkeyIfFalse: Number.parseInt(
        monkey[5].substring('    If true: throw to monkey '.length),
      ),
      numberOfInspections: 0,
    }));

const doOperation = (left: number, op: string, right: number) =>
  op === '*' ? left * right : left + right;

const monkeyGame = (
  input: string,
  divideByThree = true,
  numberOfRounds = 20,
) => {
  const monkeys = getMonkeys(input);

  const runRound = () => {
    monkeys.forEach((monkey, monkeyIndex) => {
      const { items, operation, divisible, toMonkeyIfTrue, toMonkeyIfFalse } =
        monkey;
      items.forEach((item) => {
        const newWorryLevels = item.map(
          (itemWorryLevel, itemWorryLevelIndex) => {
            const operationResult = doOperation(
              operation[0] === 'old'
                ? itemWorryLevel
                : Number.parseInt(operation[0]),
              operation[1],
              operation[2] === 'old'
                ? itemWorryLevel
                : Number.parseInt(operation[2]),
            );
            return divideByThree
              ? Math.floor(operationResult / 3)
              : operationResult % monkeys[itemWorryLevelIndex].divisible;
          },
        );
        const newWorryLevel = newWorryLevels[monkeyIndex];
        if (newWorryLevel === undefined) throw new Error('woops');
        const isDivisible = newWorryLevel % divisible === 0;
        const toMonkey = isDivisible ? toMonkeyIfTrue : toMonkeyIfFalse;
        monkeys[toMonkey].items.push(newWorryLevels);
        monkey.numberOfInspections += 1;
      });
      monkey.items = [];
    });
  };

  for (var i = 0; i < numberOfRounds; i += 1) {
    runRound();
  }
  // console.log(
  //   JSON.stringify(
  //     monkeys.map(({ items, numberOfInspections }) => ({
  //       items,
  //       numberOfInspections,
  //     })),
  //     null,
  //     2,
  //   ),
  // );

  const twoMostActiveMonkeys = monkeys
    .map(({ numberOfInspections }) => numberOfInspections)
    .sort((a, b) => b - a);
  console.log(twoMostActiveMonkeys);
  return twoMostActiveMonkeys[0] * twoMostActiveMonkeys[1];
};

test('part 1', () => {
  assert.strictEqual(monkeyGame(testInput), 10605);
});

test('part 2', () => {
  // assert.strictEqual(solve(testInput, 10), 1);
  // assert.strictEqual(solve(testInput2, 10), 36);
});

(() => {
  console.log('Part 1: ' + monkeyGame(input));
  console.log('Part 2: ' + monkeyGame(input, false, 10000));
})();
