import { IOperationExecutor, getParameterValue, getParameterMode, getValuePosition } from '../operation';
import { OpCode, IProgramState } from '../intCodeComputer';

export const setRelativeBase: IOperationExecutor = (programState: IProgramState) => {
    const operationInstructions = programState.program[programState.position].toString();
    const valuePosition = getValuePosition(programState, 1, getParameterMode(operationInstructions,1), true);
    const value = getParameterValue(programState, programState.position + 1, getParameterMode(operationInstructions, 1));
    //const value = programState.program[valuePosition];
    return {
        programState: { 
            ...programState,
            relativeBase: programState.relativeBase + value,
            position: programState.position + 2
        }
    };
}