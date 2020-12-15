export function play(first: number[], turns: number) {
    const past = new Array<number>(turns);
    for (let turn = 1; turn <= first.length; turn++) {
        past[first[turn - 1]] = turn;
    }

    let spoken = first[first.length - 1];
    let next = 0;
    for (let turn = first.length + 1; turn <= turns; turn++) {
        let speak = next ? turn - 1 - next : 0;
        const lastTurn = past[speak];
        past[speak] = turn;

        next = lastTurn ? lastTurn : 0;
        spoken = speak;
    }
    return spoken;
}

const puzzleInput = [11, 18, 0, 20, 1, 7, 16];

export const part1 = () => play(puzzleInput, 2020);

export const part2 = () => play(puzzleInput, 30000000);
