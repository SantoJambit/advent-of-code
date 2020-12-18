import { addArray, loadFile } from '../lib';

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => v.toString());
const isDigit = (c: string) => digits.includes(c);

function takeValue(invStr: string[]) {
    let c = invStr.pop();
    if (c === '(') {
        let open = 1;
        const expr: string[] = [];
        while (open > 0) {
            if (invStr.length === 0)
                throw new Error('Unexpected EOL looking for closing )');
            c = invStr.pop();
            if (c === ')') open--;
            else if (c === '(') open++;
            expr.push(c);
        }
        expr.pop(); // pop last ')'
        if (invStr.length > 0) {
            const white = invStr.pop();
            if (white !== ' ')
                throw new Error(`Expected whitespace after ), not "${white}"`);
        }
        if (expr.every(isDigit)) {
            return parseInt(expr.join(''));
        }
        return evaluateExpressionRecursive(expr.reverse());
    } else if (isDigit(c)) {
        const expr = [c];
        while (invStr.length) {
            c = invStr.pop();
            if (!isDigit(c)) {
                if (c !== ' ')
                    throw new Error(`Expected whitespace, not "${c}"`);
                break;
            }
            expr.push(c);
        }
        return parseInt(expr.join(''));
    }
    throw new Error(`Expected digit or (, not "${c}"`);
}

function evaluateExpressionRecursive(invStr: string[]) {
    let result = takeValue(invStr);
    while (invStr.length) {
        const op = invStr.pop();
        const white = invStr.pop();
        if (white !== ' ')
            throw new Error(`Expected whitespace after ${op}, not "${white}"`);

        const b = takeValue(invStr);
        if (op === '+') result += b;
        else if (op === '*') result *= b;
        else throw new Error(`Expected + or *, not "${op}"`);
    }
    return result;
}

export function evaluateExpression(line: string) {
    return evaluateExpressionRecursive(line.split('').reverse());
}

const puzzleInput = loadFile('day18/input.txt');

export const part1 = () => addArray(puzzleInput.map(evaluateExpression));
