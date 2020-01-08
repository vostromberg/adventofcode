import { runProgram } from "../intCodeComputer/intCodeComputer";
import { day9input } from "./day9-input";



export const day9part1 = async () => {
    console.log(day9input);
    const programResult = runProgram(day9input,1);
    console.log(programResult);
    return programResult.output.join(",");
}

export const day9part2 = async () => {

    return "Not finished yet";
}