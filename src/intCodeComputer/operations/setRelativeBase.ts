import { IOperationExecutor, getParameterValue, getParameterMode, getValuePosition, ParameterMode } from '../operation';
import { OpCode, IProgramState } from '../intCodeComputer';

export const setRelativeBase: IOperationExecutor = (programState: IProgramState) => {
    const operationInstructions = programState.program[programState.position].toString();
    const parameterMode = getParameterMode(operationInstructions, 1);
    const valuePosition = getValuePosition(programState, programState.position + 1, parameterMode);
    const value = getParameterValue(programState, valuePosition, parameterMode);
    console.log(`P-mode: ${ParameterMode[parameterMode]} pos: ${valuePosition} val: ${value} command: ${programState.program.slice(programState.position, programState.position + 2).join(",")}`)
    console.log(`Adjusting Base from ${programState.relativeBase} to ${programState.relativeBase + value}`)
    return {
        programState: {
            ...programState,
            relativeBase: programState.relativeBase + value,
            position: programState.position + 2
        }
    };
}