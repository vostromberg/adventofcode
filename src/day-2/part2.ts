import { getInput } from "./day2";
import { runProgram } from "../intCodeComputer/intCodeComputer";

export const day2part2 = async () => {
    const expectedResult = 19690720;
    let lastRunResult = -1;
    let noun = 0;
    let verb = 0;
    while (lastRunResult != expectedResult) {
        let input = getInput();
        if(verb < 100){
            verb++;
        }
        else{
            noun++;
            verb = 0;
        }
        input[1] = noun;
        input[2] = verb;
        lastRunResult = runProgram(input)[0];
    }
    return 100 * noun + verb;
}