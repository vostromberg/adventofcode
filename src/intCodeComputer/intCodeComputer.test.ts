import { runProgram } from "./intCodeComputer";
import { getParameterMode, ParameterMode } from "./operation";

describe("intCodeComputer", () => {
    test("1,0,0,0,99 becomes 2,0,0,0,99", () => {
        let result = runProgram([1, 0, 0, 0, 99]);
        expect(result.programState.program).toEqual([2, 0, 0, 0, 99]);
    });
    test("2,3,0,3,99 becomes 2,3,0,6,99", () => {
        let result = runProgram([2, 3, 0, 3, 99]);
        expect(result.programState.program).toEqual([2, 3, 0, 6, 99]);
    });
    test("2,4,4,5,99,0 becomes 2,4,4,5,99,9801", () => {
        let result = runProgram([2, 4, 4, 5, 99, 0]);
        expect(result.programState.program).toEqual([2, 4, 4, 5, 99, 9801]);
    });
    test("1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99", () => {
        let result = runProgram([1, 1, 1, 4, 99, 5, 6, 0, 99]);
        expect(result.programState.program).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
    });

    test("Test negative instructions", () => {
        let result = runProgram([1101, 100, -1, 4, 0]);
        expect(result.programState.program).toEqual([1101, 100, -1, 4, 99]);
    })

    test("Output position operation", () => {
        let result = runProgram([4, 3, 99, 5]);
        expect(result.output).toEqual([5]);
    });

    test("Output immediate operation", () => {
        let result = runProgram([104, 3, 99, 5]);
        expect(result.output).toEqual([3]);
    })

    test("Input operation", () => {
        let result = runProgram([103, 3, 99, 5], 10);
        expect(result.programState.program).toEqual([103, 3, 99, 10]);
    })

    test("Parameter modes", () => {
        const operationInstructions = "1002";
        let param1 = getParameterMode(operationInstructions, 1);
        let param2 = getParameterMode(operationInstructions, 2);
        let param3 = getParameterMode(operationInstructions, 3);
        let param4 = getParameterMode("6",1);
        expect(param1).toBe(ParameterMode.PositionMode);
        expect(param2).toBe(ParameterMode.ImmediateMode);
        expect(param3).toBe(ParameterMode.PositionMode);
        expect(param4).toBe(ParameterMode.PositionMode);
    });

    test("jumptest 1 (position mode)", () => {
        let positiveResult = runProgram([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 1);
        let negativeResult = runProgram([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    })

    test("jumptest 1 (immediate mode)", () => {
        let positiveResult = runProgram([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 1);
        let negativeResult = runProgram([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    })

    test("", () => {
        let result = runProgram([3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99], 9);
        expect(result.output[0]).toBe(1001);
    });

    test("'equal to' in position mode", () => {
        let positiveResult = runProgram([3,9,8,9,10,9,4,9,99,-1,8], 8);
        let negativeResult = runProgram([3,9,8,9,10,9,4,9,99,-1,8], 7);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });

    test("'less than' in position mode", () => {
        
        let positiveResult = runProgram([3,9,7,9,10,9,4,9,99,-1,8], 7);
        let negativeResult = runProgram([3,9,7,9,10,9,4,9,99,-1,8], 9);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });

    test("'equal to' in immediate mode", () => {
        
        let positiveResult = runProgram([3,3,1108,-1,8,3,4,3,99], 8);
        let negativeResult = runProgram([3,3,1108,-1,8,3,4,3,99], 9);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });

    test("'less than' in immediate mode", () => {
        
        let positiveResult = runProgram([3,3,1107,-1,8,3,4,3,99], 7);
        let negativeResult = runProgram([3,3,1107,-1,8,3,4,3,99], 9);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });
})