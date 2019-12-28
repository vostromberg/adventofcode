import { OpCode, IProgramState } from "./intCodeComputer";
export enum ParameterMode {
    PositionMode = 0,
    ImmediateMode = 1
}

export interface Parameter {
    parameterMode: ParameterMode;
    position: number;
}

export interface IOperationResult {
    output?: number;
    programState: IProgramState;
}

export interface IOperationExecutor {
    (programState: IProgramState, input?: number): IOperationResult;
}

export const getParameterMode = (operationInfo:string, parameterPosition:number) => {
    const parameterInfo = operationInfo.substring(0, operationInfo.length - 2);
    if(parameterInfo.length == 0 || parameterPosition > parameterInfo.length){
        return ParameterMode.PositionMode;
    }
    else{
        return parseInt(parameterInfo[Math.abs(parameterPosition - parameterInfo.length)]) as ParameterMode;
    }
}

export const getParameterValue = (program:number[], parameterPosition: number, mode:ParameterMode ) => {
    return mode == ParameterMode.PositionMode ? program[program[parameterPosition]] : program[parameterPosition];
}

export const parseOpCode = (operationInfo: string) => {
    return parseInt(operationInfo.substr(-2)) as OpCode;
}