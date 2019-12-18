export const runProgram = (input: number[]) => {
    let program = input.slice();
    for (var i = 0; i < program.length; i++) {
        if (i % 4 == 0) {
            const opCode = program[i];
            if (opCode === 99) {
                break;
            }
            else if (opCode === 1) {
                program[program[i + 3]] = program[program[i + 1]] + program[program[i + 2]];
            }
            else if (opCode === 2) {
                program[program[i + 3]] = program[program[i + 1]] * program[program[i + 2]];
            }
            else {
                throw "Unknown opcode";
            }
        }
    }
    return program;
}