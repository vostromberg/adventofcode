import { IOperationExecutor, getParameterValue, getParameterMode, getValuePosition, ParameterMode } from '../operation';
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
    const program = programState.program.slice();
    program[valuePosition] = programState.input as number;
    return {
        programState: {
            ...programState,
            input:undefined,
            program,
            position: programState.position + 2
        }
    };
}