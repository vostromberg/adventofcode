import { IOperationExecutor, getParameterValue, getParameterMode } from '../operation';
import { IProgramState } from '../intCodeComputer';

export const jumpIfTrue: IOperationExecutor = (programState: IProgramState) => {
    const operationInstructions = programState.program[programState.position].toString();
    const condition = getParameterValue(programState, programState.position + 1, getParameterMode(operationInstructions, 1));
    const newPosition = getParameterValue(programState, programState.position + 2, getParameterMode(operationInstructions, 2));
    return {
        programState: { 
           ...programState,
           position: condition !== 0 ? newPosition : programState.position + 3
        }
    };
}