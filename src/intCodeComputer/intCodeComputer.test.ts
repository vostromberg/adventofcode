import { runProgram, IProgramState, ProgramStatus, resumeProgram } from "./intCodeComputer";
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
        let param4 = getParameterMode("6", 1);
        expect(param1).toBe(ParameterMode.Position);
        expect(param2).toBe(ParameterMode.Immediate);
        expect(param3).toBe(ParameterMode.Position);
        expect(param4).toBe(ParameterMode.Position);
    });

    test("jumptest 1 (position mode)", () => {
        let positiveResult = runProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 1);
        let negativeResult = runProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 0);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    })

    test("jumptest 1 (immediate mode)", () => {
        let positiveResult = runProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 1);
        let negativeResult = runProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], 0);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    })

    test("", () => {
        let result = runProgram([3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99], 9);
        expect(result.output[0]).toBe(1001);
    });

    test("'equal to' in position mode", () => {
        let positiveResult = runProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8);
        let negativeResult = runProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 7);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });

    test("'less than' in position mode", () => {

        let positiveResult = runProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 7);
        let negativeResult = runProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 9);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });

    test("'equal to' in immediate mode", () => {

        let positiveResult = runProgram([3, 3, 1108, -1, 8, 3, 4, 3, 99], 8);
        let negativeResult = runProgram([3, 3, 1108, -1, 8, 3, 4, 3, 99], 9);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });

    test("Relative base adjusts correctly", () => {
        let programState: IProgramState = {
            status: ProgramStatus.NotStarted,
            input: 123,
            program: [
                109, 19, // Set relative base to +19 (immediate mode) = r2019
                204, -34, // OUTPUT value from position (-34 + r2019 = 1985) = 1
                201, 15, 25, 110, // Add relative value from position 15 (+ r2019) and position value from 25 => 32 + 12 = 44 store it to 110
                4, 110, // OUTPUT value from position 110
                203, 15, // Write input to relative position 15 (+ 2019) = 2034
                204, 15, // OUTPUT value from relative position 15 (+ 2019) = 2034
                99],
            position: 0,
            relativeBase: 2000,
            memory: {
                25: 12,
                1985: 1,
                2000: 2,
                2019: 10,
                2029: 10,
                2034: 32,
                2044: 0,
                4019: 1
            }
        };
        let result = resumeProgram(programState);
        expect(result.output[0]).toBe(1);
        expect(result.output[1]).toBe(44);
        expect(result.output[2]).toBe(123);
    });

    test("'less than' in immediate mode", () => {

        let positiveResult = runProgram([3, 3, 1107, -1, 8, 3, 4, 3, 99], 7);
        let negativeResult = runProgram([3, 3, 1107, -1, 8, 3, 4, 3, 99], 9);
        expect(positiveResult.output[0]).toBe(1);
        expect(negativeResult.output[0]).toBe(0);
    });

    test("Program creates copy of itself", () => {
        const program = [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99];
        const result = runProgram(program);
        expect(result.output).toEqual(program);
    })

    test("Program outputs 16-digit number", () => {
        const program = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];
        const result = runProgram(program);
        const output = result.output[0].toString();
        expect(output.length).toEqual(16);
    })

    test("Program outputs middle number", () => {
        const program = [104, 1125899906842624, 99];
        const result = runProgram(program);
        const output = result.output[0];
        expect(output).toEqual(program[1]);
    })
})