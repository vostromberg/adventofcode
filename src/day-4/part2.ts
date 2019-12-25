import { isValidPassword } from "../passwordValidator/passwordValidator";
import { getInput } from "./day4";

export const day4part2 = async () => {
    const input = getInput();
    const validPasswords: string[] = [];
    for (var i = input.from; i <= input.to; i++) {
        var result = isValidPassword(i.toString());
        if (result.isValid) {
            validPasswords.push(i.toString());
        }
    }
    return validPasswords.length;
};