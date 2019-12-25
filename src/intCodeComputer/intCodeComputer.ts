export const runProgram = (input: number[]) => {
    let program = input.slice();
    let isFinished = false;
    for (var i = 0; i < program.length; i++) {
        if (i % 4 == 0) {
            const opCode = program[i];
            switch (opCode) {
                case 99:
                    isFinished = true;
                    break;
                case 1:
                    program[program[i + 3]] = program[program[i + 1]] + program[program[i + 2]];
                    break;
                case 2:
                    program[program[i + 3]] = program[program[i + 1]] * program[program[i + 2]];
                    break;
                case 3:
                    break;
                case 4:
                    break;
                default:
                    throw "Unknown opcode";
            }
        }
        if (isFinished) {
            break;
        }
    }

    return program;
}