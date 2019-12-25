import { getInput } from "./day4";
import { isValidPassword } from "../passwordValidator/passwordValidator";


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