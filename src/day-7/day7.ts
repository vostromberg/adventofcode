import { countTotalOrbits, getOrbits, parseOrbitMap, findMinimumOrbitalTransfers } from "../orbitMapCalculator/orbitMapCalculator"
import { day7input } from './day7-input';
import { findLargestAmplifierOutput, findLargestAmplifierOutputWithFeedbackLoop } from "../amplifier/amplifier";

export const day7part1 = async () => {
    const result = findLargestAmplifierOutput(day7input);
    return result;
}

export const day7part2 = async () => {
    const result = findLargestAmplifierOutputWithFeedbackLoop(day7input);
    return result;
}