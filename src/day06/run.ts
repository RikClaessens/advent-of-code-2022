import assert from 'node:assert';
import test from 'node:test';
import { getInput, getInputAsString } from '../util';

const day = 'day06';
const testInput = getInput(`src/${day}/test.txt`);
const input = getInputAsString(`src/${day}/input.txt`);

enum Marker {
  START_OF_PACKAGE,
  START_OF_MESSAGE,
}

const getMarker = (input: string, marker: Marker): number => {
  const lengthUnique = marker === Marker.START_OF_PACKAGE ? 4 : 14;
  for (var i = 0; i < input.length - lengthUnique; i += 1) {
    if (new Set(input.slice(i, i + lengthUnique)).size === lengthUnique) {
      return i + lengthUnique;
    }
  }
  return -1;
};

test('part 1', () => {
  assert.strictEqual(getMarker(testInput[0], Marker.START_OF_PACKAGE), 7);
  assert.strictEqual(getMarker(testInput[1], Marker.START_OF_PACKAGE), 5);
  assert.strictEqual(getMarker(testInput[2], Marker.START_OF_PACKAGE), 6);
  assert.strictEqual(getMarker(testInput[3], Marker.START_OF_PACKAGE), 10);
  assert.strictEqual(getMarker(testInput[4], Marker.START_OF_PACKAGE), 11);
});

test('part 2', () => {
  assert.strictEqual(getMarker(testInput[0], Marker.START_OF_MESSAGE), 19);
  assert.strictEqual(getMarker(testInput[1], Marker.START_OF_MESSAGE), 23);
  assert.strictEqual(getMarker(testInput[2], Marker.START_OF_MESSAGE), 23);
  assert.strictEqual(getMarker(testInput[3], Marker.START_OF_MESSAGE), 29);
  assert.strictEqual(getMarker(testInput[4], Marker.START_OF_MESSAGE), 26);
});

(() => {
  console.log('Part 1: ' + getMarker(input, Marker.START_OF_PACKAGE));
  console.log('Part 2: ' + getMarker(input, Marker.START_OF_MESSAGE));
})();
