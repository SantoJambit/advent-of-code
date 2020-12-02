export interface PasswordEntry {
    password: string;
    policy: PasswordPolicy;
}

export interface PasswordPolicy {
    letter: string;
    a: number;
    b: number;
}

export function testPasswordPolicy({ password, policy: { letter, a, b } }: PasswordEntry) {
    const count = password.split('').filter((c) => c === letter).length;
    return count >= a && count <= b;
}

export function testOfficialPasswordPolicy({ password, policy: { letter, a, b } }: PasswordEntry) {
    const matchA = password[a - 1] === letter;
    const matchB = password[b - 1] === letter;

    return matchA !== matchB;
}

export function countValidPasswords(
    entries: PasswordEntry[],
    test: (entry: PasswordEntry) => boolean,
) {
    return entries.filter(test).length;
}
