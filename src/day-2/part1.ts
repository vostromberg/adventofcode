import { getInput } from "./day2";
import { runProgram } from "../intCodeComputer/intCodeComputer";

export const day2part1 = async () => {
    let input = getInput();
    input[1] = 12;
    input[2] = 2;
    let programResult = runProgram(input);
    return programResult.programState.program[0];
}