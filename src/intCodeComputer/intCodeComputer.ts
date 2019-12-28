import { parseOpCode, IOperationExecutor } from "./operation";
import { addOperation } from "./addOperation";
import { multiplyOperation } from "./multiplyOperation";
import { writeInputOperation } from "./writeInputOperation";
import { writeOutputOperation } from "./writeOutputOperation";

export enum OpCode {
    Add = 1,
    Multiply = 2,
    WriteInput = 3,
    WriteOutput = 4,
    Exit = 99
}

export interface IProgramState{
    program:number[];
    position:number;
}

export interface IProgramResult{
    programState:IProgramState;
    output:number[];
}

export const getExecutor = (opCode:OpCode): IOperationExecutor => {
    switch(opCode) {
        case OpCode.Add:
            return addOperation;
        case OpCode.Multiply:
            return multiplyOperation;
        case OpCode.WriteInput:
            return writeInputOperation;
        case OpCode.WriteOutput:
            return writeOutputOperation;
        default:
            throw "Unknown OpCode";
    }
}

export const runProgram = (program: number[], input?: number):IProgramResult => {
    let programState:IProgramState = {
        program:program.slice(),
        position:0
    };
    let isFinished = false;
    let output = [];
    while (!isFinished) {
        const opCode = parseOpCode(programState.program[programState.position].toString());
        if (opCode == OpCode.Exit) {
            isFinished = true;
        }
        else {
            const operationResult = getExecutor(opCode)(programState, input);
            //console.log(operationResult);
            if (operationResult.output) {
                console.log(operationResult);
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
