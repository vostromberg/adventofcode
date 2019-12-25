import { isValidPassword } from "../passwordValidator/passwordValidator";

export const getInput = () => {
    return {
        from:183564,
        to: 657474
    }
}

export const day4part1 = async () => {
    const input = getInput();
    const validPasswords:string[] = [];
    for(var i = input.from; i <= input.to; i++){
        var result = isValidPassword(i.toString());
        if(result.isValid){
            validPasswords.push(i.toString());
        }
    }
    return validPasswords.length;
}

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