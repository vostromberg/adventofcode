import { IOperationExecutor, getParameterValue, getParameterMode } from '../operation';
import { IProgramState } from '../intCodeComputer';

export const writeInputOperation: IOperationExecutor = (programState: IProgramState) => {
    const valueToWrite = programState.input[0];
    const valuePosition = programState.program[programState.position + 1];
    const program = programState.program.slice();
    program[valuePosition] = valueToWrite;
    return {
        programState: { 
           input: programState.input.slice(1),
           program,
           position: programState.position + 2
        }
    };
}