import { IOperationExecutor, getParameterValue, getParameterMode, getValuePosition } from '../operation';
import { IProgramState } from '../intCodeComputer';

export const multiplyOperation: IOperationExecutor = (programState: IProgramState) => {
    const operationInstructions = programState.program[programState.position].toString();
    const value1 = getParameterValue(programState, programState.position + 1, getParameterMode(operationInstructions, 1));
    const value2 = getParameterValue(programState, programState.position + 2, getParameterMode(operationInstructions, 2));
    const result = value1 * value2;
    const valuePosition = getValuePosition(programState, programState.position + 3, getParameterMode(operationInstructions, 3), true);
    const program = programState.program.slice();
    program[valuePosition] = result;
    return {
        programState: { 
            ...programState,
            program,
            position: programState.position + 4
        }
    };
}