import { countTotalOrbits, getOrbits, parseOrbitMap } from "../orbitMapCalculator/orbitMapCalculator"
import { day6input } from './day6-input';

export const day6part1 = async () => {
    const count = countTotalOrbits(getOrbits(parseOrbitMap(day6input)))
    return count;
}

export const day6part2 = async () => {
    
    return "Hej";
}