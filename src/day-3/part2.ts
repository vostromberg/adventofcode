import { getInput } from "./day3";
import { ICoordinate, getClosestIntersectionBySteps } from "../wireCoordinateSystem/wireCoordinateSystem";

export const day3part2 = () => { 
    const input = getInput();
    const startCoordinate: ICoordinate = {
        x: 0,
        y: 0,
        steps:0
    };
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result = getClosestIntersectionBySteps(input.wireA, input.wireB);
            resolve(result);
        }, 0);
    });
};