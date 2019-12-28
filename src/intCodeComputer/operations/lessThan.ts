import { IOperationExecutor, getParameterValue, getParameterMode } from '../operation';
import { IProgramState } from '../intCodeComputer';

export const lessThan: IOperationExecutor = (programState: IProgramState, input?: number) => {
    const operationInstructions = programState.program[programState.position].toString();
    const value1 = getParameterValue(programState.program, programState.position + 1, getParameterMode(operationInstructions, 1));
    const value2 = getParameterValue(programState.program, programState.position + 2, getParameterMode(operationInstructions, 2));
    const valuePosition = programState.program[programState.position + 3];
    const program = programState.program.slice();
    program[valuePosition] = value1 < value2 ? 1 : 0;
    return {
        programState: {
            ...programState,
            program,
            position: programState.position + 4
        }
    };
}