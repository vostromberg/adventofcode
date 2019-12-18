import { getInput } from "./day1";

export const calcFuel = (mass: number) => {
    const calcFunction = (input: number) => {
        const fuel = Math.floor(input / 3) - 2;
        return fuel > 0 ? fuel : 0;
    };
    let total = calcFunction(mass);
    let remainingFuelToCalculate = calcFunction(total);
    while (remainingFuelToCalculate > 0) {
        total += remainingFuelToCalculate;
        remainingFuelToCalculate = calcFunction(remainingFuelToCalculate);
    }
    return total;
}

export const day1part2 = async () => {
    const input = getInput();
    return input.reduce((prev, curr) => {
        return prev + calcFuel(curr);
    },0);
}