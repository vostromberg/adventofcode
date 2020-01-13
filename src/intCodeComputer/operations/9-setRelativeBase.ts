import { IOperationExecutor, getParameterValue, getParameterMode, getValuePosition, ParameterMode } from '../operation';
import { OpCode, IProgramState } from '../intCodeComputer';

export const setRelativeBase: IOperationExecutor = (programState: IProgramState) => {
    const operationInstructions = programState.program[programState.position].toString();
    const parameterMode = getParameterMode(operationInstructions, 1);
    const value = getParameterValue(programState, programState.position + 1, parameterMode);
    return {
        programState: {
            ...programState,
            relativeBase: programState.relativeBase + value,
            position: programState.position + 2
        }
    };
}