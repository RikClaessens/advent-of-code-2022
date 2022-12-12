import assert from 'node:assert';
import test from 'node:test';
import { getInput } from '../util';

const day = 'day07';
const testInput = getInput(`src/${day}/test.txt`);
const input = getInput(`src/${day}/input.txt`);

const getDirs = (input: string[]) => {
  const dirs: any = {};
  let currentPath: string[] = [];

  let i = 0;
  while (i < input.length) {
    const line = input[i].split(' ');
    if (line[0].startsWith('$')) {
      // command
      const command = line[1];
      const argument = line[2];
      if (command === 'cd') {
        if (argument === '..') {
          const pop = currentPath.pop();
          if (pop && currentPath.length > 0) {
            dirs[currentPath.join('/')].size +=
              dirs[[...currentPath, pop].join('/')].size;
          }
        } else {
          currentPath.push(argument);
        }
      }
    } else {
      do {
        const lsOutput = input[i].split(' ');
        let fileOrDir = {
          name: lsOutput[1],
          isDir: lsOutput[0] === 'dir',
          size: Number.parseInt(lsOutput[0]),
        };
        if (!dirs[currentPath.join('/')]) {
          dirs[currentPath.join('/')] = {
            dirs: [],
            size: 0,
          };
        }
        if (fileOrDir.isDir) {
          dirs[currentPath.join('/')].dirs.push(fileOrDir.name);
        } else {
          dirs[currentPath.join('/')].size += fileOrDir.size;
        }
        i += 1;
      } while (i < input.length && !input[i].startsWith('$'));
      i -= 1;
    }
    i += 1;
  }

  // pop and calculcate sizes up to root
  while (currentPath.length > 0) {
    const pop = currentPath.pop();
    if (pop && currentPath.length >= 1) {
      dirs[currentPath.join('/')].size +=
        dirs[[...currentPath, pop].join('/')].size;
    }
  }
  return dirs;
};

const getSumOfDirsOfSize = (input: string[], maxDirSize: number) => {
  const dirs = getDirs(input);
  const result = Object.keys(dirs)
    .filter((key) => dirs[key].size <= maxDirSize)
    .reduce((total: number, key: string) => {
      return total + dirs[key].size;
    }, 0);
  return result;
};

const getDirToDelete = (
  input: string[],
  totalDiskSize: number,
  wantedFreeSpace: number,
) => {
  const dirs = getDirs(input);
  const needToCleanUp = wantedFreeSpace - (totalDiskSize - dirs['/'].size);
  const result = Object.keys(dirs)
    .filter((key) => dirs[key].size >= needToCleanUp)
    .reduce((min: number, key: string) => {
      return Math.min(min, dirs[key].size);
    }, Number.MAX_VALUE);
  return result;
};

test('part 1', () => {
  assert.strictEqual(getSumOfDirsOfSize(testInput, 100000), 95437);
});

test('part 2', () => {
  assert.strictEqual(getDirToDelete(testInput, 70000000, 30000000), 24933642);
});

(() => {
  console.log('Part 1: ' + getSumOfDirsOfSize(input, 100000));
  console.log('Part 2: ' + getDirToDelete(input, 70000000, 30000000));
})();
