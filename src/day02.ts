export interface PasswordEntry {
    password: string;
    policy: PasswordPolicy;
}

export interface PasswordPolicy {
    letter: string;
    min: number;
    max: number;
}

export function testPasswordPolicy({ password, policy: { letter, min, max } }: PasswordEntry) {
    const count = password.split('').filter((c) => c === letter).length;
    return count >= min && count <= max;
}

export function countValidPasswords(entries: PasswordEntry[]) {
    return entries.filter(testPasswordPolicy).length;
}
