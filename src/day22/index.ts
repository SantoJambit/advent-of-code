import { loadFileGroupedByBlankLine } from '../lib';

export const playerRegex = /^Player ([0-9]+):$/;

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

export function clonePlayerState(
    state: PlayerState,
    numberOfCards?: number
): PlayerState {
    return {
        id: state.id,
        cards: state.cards.slice(0, numberOfCards),
    };
}

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

export function playRecursiveCombat(
    player1: PlayerState,
    player2: PlayerState
) {
    const cards1 = player1.cards;
    const cards2 = player2.cards;
    const cards1History: string[] = [];
    const cards2History: string[] = [];

    let winner: PlayerState;
    while (cards1.length && cards2.length) {
        const s1 = cards1.join();
        const s2 = cards2.join();
        if (!cards1History.includes(s1)) {
            cards1History.push(s1);
        } else {
            winner = player1;
            break;
        }
        if (!cards2History.includes(s2)) {
            cards2History.push(s2);
        } else {
            winner = player1;
            break;
        }
        const card1 = cards1.shift();
        const card2 = cards2.shift();
        if (cards1.length >= card1 && cards2.length >= card2) {
            const subWinner = playRecursiveCombat(
                clonePlayerState(player1, card1),
                clonePlayerState(player2, card2)
            );
            winner = subWinner.id === player1.id ? player1 : player2;
        } else {
            winner = card1 > card2 ? player1 : player2;
        }
        if (winner === player1) winner.cards.push(card1, card2);
        else winner.cards.push(card2, card1);
    }

    return winner;
}

export function getFinalScore2(player1: PlayerState, player2: PlayerState) {
    const winner = playRecursiveCombat(
        clonePlayerState(player1),
        clonePlayerState(player2),
    ).cards;

    return winner.reduce((r, v, i) => r + v * (winner.length - i), 0);
}
const puzzleInput = loadFileGroupedByBlankLine('day22/input.txt').map(
    parsePlayerState
);

export const part1 = () => getFinalScore(puzzleInput[0], puzzleInput[1]);

export const part2 = () => getFinalScore2(puzzleInput[0], puzzleInput[1]);
