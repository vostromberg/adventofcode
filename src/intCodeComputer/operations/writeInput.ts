import { IOperationExecutor, getParameterValue, getParameterMode } from '../operation';
import { IProgramState } from '../intCodeComputer';

export const writeInputOperation: IOperationExecutor = (programState: IProgramState, input?:number) => {
    const valuePosition = programState.program[programState.position + 1];
    const program = programState.program.slice();
    program[valuePosition] = input as number;
    return {
        programState: { 
           ...programState,
           program,
           position: programState.position + 2
        }
    };
}