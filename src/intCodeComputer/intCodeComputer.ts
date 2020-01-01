import { parseOpCode, IOperationExecutor } from "./operation";
import { addOperation } from "./operations/add";
import { multiplyOperation } from "./operations/multiply";
import { writeInputOperation } from "./operations/writeInput";
import { writeOutputOperation } from "./operations/writeOutput";
import { jumpIfFalse } from "./operations/jumpIfFalse";
import { jumpIfTrue } from "./operations/jumpIfTrue";
import { lessThan } from "./operations/lessThan";
import { equal } from "assert";
import { equals } from "./operations/equals";

export enum OpCode {
    Add = 1,
    Multiply = 2,
    WriteInput = 3,
    WriteOutput = 4,
    JumpIfTrue = 5,
    JumpIfFalse = 6,
    LessThan = 7,
    Equals = 8,
    Exit = 99
}

export interface IProgramState {
    input: number[];
    program: number[];
    position: number;
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
        default:
            throw "Unknown OpCode " + opCode;
    }
}

export const runProgram = (program: number[], ...input: number[]): IProgramResult => {
    let programState: IProgramState = {
        input:input.slice(),
        program: program.slice(),
        position: 0
    };
    let isFinished = false;
    let output = [];
    while (!isFinished) {
        const opCode = parseOpCode(programState.program[programState.position].toString());
        if (opCode == OpCode.Exit) {
            isFinished = true;
        }
        else {
            const operationResult = getExecutor(opCode)(programState);
            //console.log(operationResult);
            if (operationResult.output !== undefined) {
                output.push(operationResult.output);
            }
            programState = operationResult.programState;
        }
    }

    return {
        programState,
        output
    };
}
