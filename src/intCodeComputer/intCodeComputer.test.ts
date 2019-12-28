import { runProgram } from "./intCodeComputer";
import { getParameterMode, ParameterMode } from "./operation";

describe("intCodeComputer", () => {
    test("1,0,0,0,99 becomes 2,0,0,0,99", () => {
        let result = runProgram([1,0,0,0,99]);
        expect(result.programState.program).toEqual([2,0,0,0,99]);
    });
    test("2,3,0,3,99 becomes 2,3,0,6,99", () => {
        let result = runProgram([2,3,0,3,99]);
        expect(result.programState.program).toEqual([2,3,0,6,99]);
    });
    test("2,4,4,5,99,0 becomes 2,4,4,5,99,9801", () => {
        let result = runProgram([2,4,4,5,99,0]);
        expect(result.programState.program).toEqual([2,4,4,5,99,9801]);
    });
    test("1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99", () => {
        let result = runProgram([1,1,1,4,99,5,6,0,99]);
        expect(result.programState.program).toEqual([30,1,1,4,2,5,6,0,99]);
    });

    test("Test negative instructions", () => {
        let result = runProgram([1101,100,-1,4,0]);
        expect(result.programState.program).toEqual([1101,100,-1,4,99]);
    })

    test("Output position operation", () => {
        let result = runProgram([4,3,99,5]);
        expect(result.output).toEqual([5]);
    });

    test("Output immediate operation", () => {
        let result = runProgram([104,3,99,5]);
        expect(result.output).toEqual([3]);
    })

    test("Input operation", () => {
        let result = runProgram([103,3,99,5], 10);
        expect(result.programState.program).toEqual([103,3,99,10]);
    })

    test("Parameter modes", () => {
        const operationInstructions = "1002";
        let param1 = getParameterMode(operationInstructions, 1);
        let param2 = getParameterMode(operationInstructions, 2);
        let param3 = getParameterMode(operationInstructions, 3);
        expect(param1).toBe(ParameterMode.PositionMode);
        expect(param2).toBe(ParameterMode.ImmediateMode);
        expect(param3).toBe(ParameterMode.PositionMode);
    })
})