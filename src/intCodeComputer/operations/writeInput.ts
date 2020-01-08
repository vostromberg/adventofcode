import { IOperationExecutor, getParameterValue, getParameterMode, getValuePosition, ParameterMode, writeValue } from '../operation';
import { IProgramState, ProgramStatus } from '../intCodeComputer';

export const writeInputOperation: IOperationExecutor = (programState: IProgramState) => {
    if (programState.input === undefined) {
        return {
            programState: {
                ...programState,
                status: ProgramStatus.WaitingForInput
            }
        }
    }
    const operationInfo = programState.program[programState.position].toString();
    const parameterMode = getParameterMode(operationInfo, 1);
    const valuePosition = getValuePosition(programState, programState.position + 1, parameterMode, true);
    const newState = writeValue(programState, valuePosition, programState.input);
    return {
        programState: { 
            ...newState,
            input: undefined,
            position: programState.position + 2
        }
    };
}