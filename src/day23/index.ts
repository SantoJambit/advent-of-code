interface Node {
    prev: Node;
    next: Node;
    value: number;
}

function createNodes(firstValues: number[], fillUp: number) {
    const byValue: Node[] = Array.from({ length: fillUp + 1 });
    const first: Node = {
        prev: 0 as any,
        next: 0 as any,
        value: firstValues.shift(),
    };
    byValue[first.value] = first;
    first.prev = first;
    first.next = first;
    let prev = first;
    for (const value of firstValues) {
        const next: Node = {
            prev,
            next: prev.next,
            value,
        };
        byValue[value] = next;
        const prevNext = prev.next;
        prev.next = next;
        prevNext.prev = next;
        prev = next;
    }

    for (let value = firstValues.length + 2; value <= fillUp; value++) {
        const next: Node = {
            prev,
            next: prev.next,
            value,
        };
        byValue[value] = next;
        next.next.prev = next;
        next.prev.next = next;
        prev = next;
    }

    return {
        first,
        byValue,
    };
}

type CupsInfo = ReturnType<typeof createNodes>;

function moveCups({ first, byValue }: CupsInfo, moves: number) {
    let currentCup = first;
    const minCup = 1;
    const maxCup = byValue.length - 1;
    for (let i = 0; i < moves; i++) {
        const pickupFirst = currentCup.next;
        const pickupLast = pickupFirst.next.next;
        currentCup.next = pickupLast.next;
        currentCup.next.prev = currentCup;
        const pickupValues = [
            pickupFirst.value,
            pickupFirst.next.value,
            pickupLast.value,
        ];

        let destinationCupValue = currentCup.value;
        do {
            destinationCupValue--;
            if (destinationCupValue < minCup) destinationCupValue = maxCup;
        } while (pickupValues.includes(destinationCupValue));
        const destinationCup = byValue[destinationCupValue];
        const destinationCupNext = destinationCup.next;
        destinationCup.next = pickupFirst;
        pickupFirst.prev = destinationCup;
        pickupLast.next = destinationCupNext;

        currentCup = currentCup.next;
    }
}

export function solution1(input: number[], moves: number) {
    const nodes = createNodes(input.slice(), input.length - 1);
    const one = nodes.byValue[1];
    moveCups(nodes, moves);
    const values = [];
    let next = one.next;
    do {
        values.push(next.value);
        next = next.next;
    } while (next !== one);
    return values.join('');
}

export function solution2(input: number[]) {
    const nodes = createNodes(input.slice(), 1000000);
    const one = nodes.byValue[1];
    moveCups(nodes, 10000000);
    return one.next.value * one.next.next.value;
}

const puzzleInput = [1, 6, 7, 2, 4, 8, 3, 5, 9];

export const part1 = () => solution1(puzzleInput, 100);

export const part2 = () => solution2(puzzleInput);
