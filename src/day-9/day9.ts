import { runProgram } from "../intCodeComputer/intCodeComputer";
import { day9input } from "./day9-input";



export const day9part1 = async () => {
    const programResult = runProgram(day9input, 1);
    return programResult.output.join(",");
}

export const day9part2 = async () => {
    const programResult = runProgram(day9input, 2);
    return programResult.output.join(",");
}