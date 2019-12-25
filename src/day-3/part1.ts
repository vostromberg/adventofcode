import { getInput } from "./day3"
import { ICoordinate, getClosestIntersectionByManhattanDistance } from "../wireCoordinateSystem/wireCoordinateSystem";


export const day3part1 = async () => {
    const input = getInput();
    const startCoordinate: ICoordinate = {
        x: 0,
        y: 0,
        steps:0
    };
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result = getClosestIntersectionByManhattanDistance(input.wireA, input.wireB);
            resolve(result);
        }, 0);
    });
}