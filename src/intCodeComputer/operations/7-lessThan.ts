import { IOperationExecutor, getParameterValue, getParameterMode, getValuePosition, writeValue } from '../operation';
import { IProgramState } from '../intCodeComputer';

export const lessThan: IOperationExecutor = (programState: IProgramState) => {
    const operationInstructions = programState.program[programState.position].toString();
    const value1 = getParameterValue(programState, programState.position + 1, getParameterMode(operationInstructions, 1));
    const value2 = getParameterValue(programState, programState.position + 2, getParameterMode(operationInstructions, 2));
    const valuePosition = getValuePosition(programState, programState.position + 3, getParameterMode(operationInstructions, 3), true);
    const result = value1 < value2 ? 1 : 0;
    const newState = writeValue(programState, valuePosition, result);
    return {
        programState: { 
            ...newState,
            position: programState.position + 4
        }
    };
}