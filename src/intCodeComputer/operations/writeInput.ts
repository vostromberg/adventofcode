import { IOperationExecutor, getParameterValue, getParameterMode } from '../operation';
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
    const valuePosition = programState.program[programState.position + 1];
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