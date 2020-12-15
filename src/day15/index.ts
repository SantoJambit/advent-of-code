export function play(first: number[], turns: number) {
    const lastTurns: { [s: string]: number } = {};
    const secondLastTurns: { [s: string]: number } = {};
    for (let turn = 1; turn <= first.length; turn++) {
        lastTurns[first[turn - 1]] = turn;
    }

    let last = first[first.length - 1];
    for (let turn = first.length + 1; turn <= turns; turn++) {
        let speak = 0;
        let secondLastTurn = secondLastTurns[last];
        if (secondLastTurn) {
            const lastTurn = turn - 1;
            speak = lastTurn - secondLastTurn;
        }
        secondLastTurns[speak] = lastTurns[speak];
        lastTurns[speak] = turn;
        last = speak;
    }
    return last;
}

const puzzleInput = [11, 18, 0, 20, 1, 7, 16];

export const part1 = () => play(puzzleInput, 2020);
