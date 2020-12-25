export const puzzleInput = {
    cardPublicKey: 3248366,
    doorPublicKey: 4738476,
};

const magicNumber = 20201227;

export function transform(subject: number, loopSize: number) {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value = (value * subject) % magicNumber;
    }
    return value;
}

export function getLoopSize(subject: number, publicKey: number) {
    let value = 1;
    for (let i = 0; ; i++) {
        value = (value * subject) % magicNumber;
        if (value === publicKey) return i + 1;
    }
}

export const part1 = () => {
    const cardLoopSize = getLoopSize(7, puzzleInput.cardPublicKey);
    return transform(puzzleInput.doorPublicKey, cardLoopSize);
};

export const part2 = () => 'Nothing left to do';
