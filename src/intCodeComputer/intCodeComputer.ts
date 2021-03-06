import { parseOpCode, IOperationExecutor } from "./operation";
import { addOperation } from "./operations/1-add";
import { multiplyOperation } from "./operations/2-multiply";
import { writeInputOperation } from "./operations/3-writeInput";
import { writeOutputOperation } from "./operations/4-writeOutput";
import { jumpIfFalse } from "./operations/6-jumpIfFalse";
import { jumpIfTrue } from "./operations/5-jumpIfTrue";
import { lessThan } from "./operations/7-lessThan";
import { equals } from "./operations/8-equals";
import { setRelativeBase } from "./operations/9-setRelativeBase";

export enum OpCode {
    Add = 1,
    Multiply = 2,
    WriteInput = 3,
    WriteOutput = 4,
    JumpIfTrue = 5,
    JumpIfFalse = 6,
    LessThan = 7,
    Equals = 8,
    SetRelativeBase = 9,
    Exit = 99,
}

export enum ProgramStatus {
    NotStarted,
    Running,
    WaitingForInput,
    Finished
}

export interface IProgramState {
    input?: number;
    program: number[];
    position: number;
    status: ProgramStatus;
    relativeBase: number;
    memory: { [key: number]: number };
}

export interface IProgramResult {
    programState: IProgramState;
    output: number[];
}

export const getExecutor = (opCode: OpCode): IOperationExecutor => {
    switch (opCode) {
        case OpCode.Add:
            return addOperation;
        case OpCode.Multiply:
            return multiplyOperation;
        case OpCode.WriteInput:
            return writeInputOperation;
        case OpCode.WriteOutput:
            return writeOutputOperation;
        case OpCode.JumpIfFalse:
            return jumpIfFalse;
        case OpCode.JumpIfTrue:
            return jumpIfTrue;
        case OpCode.LessThan:
            return lessThan;
        case OpCode.Equals:
            return equals;
        case OpCode.SetRelativeBase:
            return setRelativeBase;
        default:
            throw "Unknown OpCode " + opCode;
    }
}

const createInitialState = (program: number[], input?: number): IProgramState => {
    return {
        input,
        program: program.slice(),
        position: 0,
        status: ProgramStatus.NotStarted,
        relativeBase: 0,
        memory:{}
    };
}

export const runProgram = (program: number[], input?: number): IProgramResult => {
    let programState: IProgramState = createInitialState(program, input);
    return resumeProgram(programState);
}

export const resumeProgram = (programState: IProgramState): IProgramResult => {
    let currentState: IProgramState = programState;
    currentState.status = ProgramStatus.Running;
    let output = [];

    while (currentState.status != ProgramStatus.Finished && currentState.status != ProgramStatus.WaitingForInput) {

        const opCode = parseOpCode(currentState.program[currentState.position].toString());
        if (opCode == OpCode.Exit) {
            currentState.status = ProgramStatus.Finished;
        }
        else {
            const execute = getExecutor(opCode);
            const operationResult = execute(currentState);
            //console.log(operationResult);
            if (operationResult.output !== undefined) {
                output.push(operationResult.output);
            }

            currentState = operationResult.programState;

        }
    }
    return {
        programState: currentState,
        output
    };
}
