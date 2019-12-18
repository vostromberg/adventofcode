import { getInput } from "./day1";

export const calcFuel = (mass: number) => {
    return Math.floor(mass / 3) - 2;
}

export const day1part1 = async () => {
    var input = getInput();
    return input.reduce((prev, current) => {
        return prev + calcFuel(current);
    }, 0);
}