export function findSummands(sum: number, possibleSummands: number[]) {
    for (const a of possibleSummands) {
        const b = possibleSummands.find((s) => a + s === sum);
        if (b || b === 0) return [a, b];
    }
    return null;
}

export function findAnswer(sum: number, possibleSummands: number[]) {
    const [a, b] = findSummands(sum, possibleSummands);
    return a * b;
}

export function findSummands2(sum: number, possibleSummands: number[]) {
    for (const a of possibleSummands) {
        for (const b of possibleSummands) {
            const ab = a + b;
            const c = possibleSummands.find((s) => ab + s === sum);
            if (c || c === 0) return [a, b, c];
        }
    }
    return null;
}

export function findAnswer2(sum: number, possibleSummands: number[]) {
    const [a, b, c] = findSummands2(sum, possibleSummands);
    return a * b * c;
}
