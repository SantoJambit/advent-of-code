export function moveCups(cups: number[], moves: number) {
    let currentCupIndex = 0;
    const minCup = Math.min(...cups);
    const maxCup = Math.max(...cups);
    for (let i = 0; i < moves; i++) {
        const currentCup = cups[currentCupIndex];
        let pickUp = cups.splice(currentCupIndex + 1, 3);
        if (pickUp.length !== 3)
            pickUp = pickUp.concat(cups.splice(0, 3 - pickUp.length));

        let destinationCup = currentCup;
        do {
            destinationCup--;
            if (destinationCup < minCup) destinationCup = maxCup;
        } while (pickUp.includes(destinationCup));
        cups.splice(cups.indexOf(destinationCup) + 1, 0, ...pickUp);

        const diff = currentCupIndex - cups.indexOf(currentCup);
        if (diff < 0) {
            const fix = cups.splice(0, -diff);
            cups.splice(cups.length, 0, ...fix);
        } else if (diff > 0) {
            const fix = cups.splice(cups.length - diff - 1, diff);
            cups.splice(0, 0, ...fix);
        }
        currentCupIndex = (currentCupIndex + 1) % cups.length;
    }
    const one = cups.indexOf(1);
    return cups.slice(one + 1).join('') + cups.slice(0, one).join('');
}

const puzzleInput = [1, 6, 7, 2, 4, 8, 3, 5, 9];

export const part1 = () => moveCups(puzzleInput, 100);
