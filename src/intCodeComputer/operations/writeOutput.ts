import { IOperationExecutor, getParameterValue, getParameterMode } from '../operation';
import { IProgramState } from '../intCodeComputer';

export const writeOutputOperation: IOperationExecutor = (programState: IProgramState) => {
    const operationInstructions = programState.program[programState.position].toString();
    const outputValue = getParameterValue(programState.program, programState.position + 1, getParameterMode(operationInstructions, 1));
    return {
        output:outputValue,
        programState: { 
           ...programState,
           position: programState.position + 2
        }
    };
}