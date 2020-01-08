import { OpCode, IProgramState, ProgramStatus } from "./intCodeComputer";
export enum ParameterMode {
    Position = 0,
    Immediate = 1,
    Relative = 2
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

export const getParameterMode = (operationInfo: string, parameterPosition: number) => {
    const parameterInfo = operationInfo.substring(0, operationInfo.length - 2);
    if (parameterInfo.length == 0 || parameterPosition > parameterInfo.length) {
        return ParameterMode.Position;
    }
    else {
        return parseInt(parameterInfo[Math.abs(parameterPosition - parameterInfo.length)]) as ParameterMode;
    }
}

export const getParameterValue = (programState: IProgramState, parameterPosition: number, mode: ParameterMode) => {
    let valuePosition: number = getValuePosition(programState, parameterPosition, mode);
    if (valuePosition < programState.program.length) {
        return programState.program[valuePosition] || 0;
    }
    else {
        return programState.memory[valuePosition] || 0;
    }
}

export const writeValue = (programState: IProgramState, valuePosition: number, value: number): IProgramState => {
    if (valuePosition < programState.program.length) {
        let program = programState.program.slice();
        program[valuePosition] = value;
        return {
            ...programState,
            program
        };
    }
    else {
        return {
            ...programState,
            memory: {
                ...programState.memory,
                [valuePosition]: value
            }
        };
    }
}
export const getValuePosition = (programState: IProgramState, parameterPosition: number, mode: ParameterMode, writeOperation = false) => {
    let memory = parameterPosition < programState.program.length ? programState.program : programState.memory;
    switch (mode) {
        case ParameterMode.Position:
            return memory[parameterPosition];
        case ParameterMode.Immediate:
            return writeOperation ? memory[parameterPosition] : parameterPosition;
        case ParameterMode.Relative:
            return memory[parameterPosition] + programState.relativeBase;
        default:
            throw "Unknown parameter mode: " + mode;
    }
}


export const parseOpCode = (operationInfo: string) => {
    return parseInt(operationInfo.substr(-2)) as OpCode;
}