import { combineImage, parseTile } from './day20';
import { loadFileGroupedByBlankLine } from './lib';

const exampleInput = loadFileGroupedByBlankLine('day20/example.txt').map(
    parseTile
);
combineImage(exampleInput.map((tile) => tile.clone()));
