import { runAmplifierSequence, getPossibleNumberCombinations, findLargestAmplifierOutput, findLargestAmplifierOutputWithFeedbackLoop } from "./amplifier";

describe("Amplifier", () => {
    test("Test 1 returns 43210", () => {
        const program = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        const phaseSettings = [4, 3, 2, 1, 0];
        const result = runAmplifierSequence(program, phaseSettings);
        expect(result).toBe(43210);
    })

    test("Test 2 returns 54321", () => {
        const program = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];
        const phaseSettings = [0, 1, 2, 3, 4];
        const result = runAmplifierSequence(program, phaseSettings);
        expect(result).toBe(54321);
    })

    test("Test 3 returns 65210", () => {
        const program = [3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0];
        const phaseSettings = [1,0,4,3,2];
        const result = runAmplifierSequence(program, phaseSettings);
        expect(result).toBe(65210);
    })

    test("Test 4 returns 139629729", () => {
        const program = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
        const result = findLargestAmplifierOutputWithFeedbackLoop(program);
        expect(result).toBe(139629729);
    })

    test("getPossibleNumberCombinations for 3 numbers returns 6 results", () => {
        const result = getPossibleNumberCombinations([0,1,2]);
        const combinationCount = 6;
        expect(result.length).toBe(combinationCount);
    })

    test("getPossibleNumberCombinations for 5 numbers returns 120 results", () => {
        const result = getPossibleNumberCombinations([0,1,2,3,4]);
        const combinationCount = 120;
        expect(result.length).toBe(combinationCount);
    })
})