import { runProgram, ProgramStatus, resumeProgram, IProgramState } from "../intCodeComputer/intCodeComputer";

export const runAmplifierSequence = (program: number[], phaseSettings: number[]) => {
    let lastOutput = 0;
    for (var i = 0; i < phaseSettings.length; i++) {
        //Pass phaseSetting
        let { programState } = runProgram(program, phaseSettings[i]);
        //Pass lastoutput
        let { output } = resumeProgram({ ...programState, input: lastOutput });
        lastOutput = output[0];
    }
    return lastOutput;
}

export const runAmplifierSequenceWithFeedbackLoop = (program: number[], phaseSettings: number[]) => {
    let lastOutput = 0;
    const controllerSoftware: IProgramState[] = [];
    let finished = false;
    while (!finished) {
        for (var i = 0; i < phaseSettings.length; i++) {
            let programState = controllerSoftware[i];
            if (!programState) {
                //Pass phaseSetting
                let programResult = runProgram(program, phaseSettings[i]);
                programState = programResult.programState;
                controllerSoftware[i] =  programState;
            }
            if (programState.status !== ProgramStatus.Finished) {

                let programResult = resumeProgram({ ...programState, input: lastOutput });
                lastOutput = programResult.output[0];
                controllerSoftware[i] = programResult.programState;
            }
        }
        if (controllerSoftware.every(x => x.status === ProgramStatus.Finished)) {
            finished = true;
        }
    }
    return lastOutput;
}

export const findLargestAmplifierOutput = (program: number[]) => {
    let largestOutput = 0;
    const phaseSettings = getPossibleNumberCombinations([0, 1, 2, 3, 4]);
    phaseSettings.forEach(x => {
        const output = runAmplifierSequence(program, x);
        largestOutput = output > largestOutput ? output : largestOutput;
    });

    return largestOutput;
}

export const findLargestAmplifierOutputWithFeedbackLoop = (program: number[]) => {
    let largestOutput = 0;
    const phaseSettings = getPossibleNumberCombinations([5, 6, 7, 8, 9]);
    phaseSettings.forEach(x => {
        const output = runAmplifierSequenceWithFeedbackLoop(program, x);
        largestOutput = output > largestOutput ? output : largestOutput;
    });

    return largestOutput;
}

export const getPossibleNumberCombinations = (numbers: number[]) => {
    if (numbers.length <= 1) {
        return [numbers];
    }
    const availableCombinations: number[][] = [];
    for (var i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        const combinations = getPossibleNumberCombinations(numbers.filter(x => x != number));
        combinations.forEach(x => availableCombinations.push([number, ...x]));
    }
    return availableCombinations;
}