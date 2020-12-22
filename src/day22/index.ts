import { loadFileGroupedByBlankLine } from '../lib';

export const playerRegex = /^Player [0-9]+:$/;

export function parsePlayerState(lines: string[]) {
    const playerLine = lines[0];
    const match = playerRegex.exec(playerLine);
    if (!match) throw new Error(`Line is not a player heading: ${playerLine}`);

    const id = parseInt(match[1]);
    return {
        id,
        cards: lines.slice(1).map((v) => parseInt(v)),
    };
}

export type PlayerState = ReturnType<typeof parsePlayerState>;

export function getFinalScore(player1: PlayerState, player2: PlayerState) {
    const cards1 = player1.cards.slice();
    const cards2 = player2.cards.slice();
    let winner: number[] = [];
    while (cards1.length && cards2.length) {
        const card1 = cards1.shift();
        const card2 = cards2.shift();
        winner = card1 > card2 ? cards1 : cards2;
        if (card1 > card2) winner.push(card1, card2);
        else winner.push(card2, card1);
    }

    return winner.reduce((r, v, i) => r + v * (winner.length - i), 0);
}

const puzzleInput = loadFileGroupedByBlankLine('day22/input.txt').map(
    parsePlayerState
);

export const part1 = () => getFinalScore(puzzleInput[0], puzzleInput[1]);
