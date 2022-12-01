import fs from 'fs';

export const getInput = (path: string) =>
  fs.readFileSync(path, 'utf8').split('\n');

export const getInputAsString = (path: string) => fs.readFileSync(path, 'utf8');
