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
