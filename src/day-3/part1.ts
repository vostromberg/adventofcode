import { getInput } from "./day3"
import { ICoordinate, getClosestDistance } from "../wireCoordinateSystem/wireCoordinateSystem";


export const day3part1 = async () => {
    const input = getInput();
    const startCoordinate: ICoordinate = {
        x: 0,
        y: 0
    };
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result = getClosestDistance(startCoordinate, input.wireA, input.wireB);
            resolve(result);
        }, 0);
    });
}