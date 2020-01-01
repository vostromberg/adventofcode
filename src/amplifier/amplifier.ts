import { runProgram } from "../intCodeComputer/intCodeComputer";

export const runAmplifierSequence = (program:number[],phaseSettings: number[]) => {
    let lastOutput = 0;
    const amplifiers = ["A", "B", "C", "D", "E"];
    for(var i = 0; i < amplifiers.length; i++){
        //Pass phaseSetting
        const programResult = runProgram(program, phaseSettings[i], lastOutput);
        //Pass lastoutput
        lastOutput = programResult.output[0];
    }
    return lastOutput;
}