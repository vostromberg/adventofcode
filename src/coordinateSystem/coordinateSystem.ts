export interface ICoordinate {
    x: number;
    y: number;
}

export enum Direction {
    Up,
    Right,
    Left,
    Down
}

export const parseDirection = (input: string) => {
    switch (input[0].toUpperCase()) {
        case 'U':
            return Direction.Up;
        case 'R':
            return Direction.Right;
        case 'L':
            return Direction.Left;
        case 'D':
            return Direction.Down;
        default:
            throw "Couldn't parse direction"
    }
}

export const parseDistance = (input: string) => {
    return parseInt(input.substr(1));
}

export const getCoordinateCalcFunction = (direction: Direction): (lastCoordinate: ICoordinate) => ICoordinate => {
    switch (direction) {
        case Direction.Up:
            return (lastCoordinate: ICoordinate) => {
                return { x: lastCoordinate.x, y: lastCoordinate.y - 1 };
            };
        case Direction.Right:
            return (lastCoordinate: ICoordinate) => {
                return { x: lastCoordinate.x + 1, y: lastCoordinate.y };
            };
        case Direction.Down:
            return (lastCoordinate: ICoordinate) => {
                return { x: lastCoordinate.x, y: lastCoordinate.y + 1 };
            };
        case Direction.Left:
            return (lastCoordinate: ICoordinate) => {
                return { x: lastCoordinate.x - 1, y: lastCoordinate.y };
            };
    }
}

export const getWireCoordinates = (startCoordinate: ICoordinate, wire: string[]) => {

    let coordinates: ICoordinate[] = [];
    let lastCoordinate = startCoordinate;
    for (var i = 0; i < wire.length; i++) {
        let distance = parseDistance(wire[i]);
        let direction = parseDirection(wire[i]);
        let calcFunction = getCoordinateCalcFunction(direction);
        for (var j = 0; j < distance; j++) {
            lastCoordinate = calcFunction(lastCoordinate);
            coordinates.push(lastCoordinate);
        }
    }

    return coordinates;
}

export const getIntersections = (startCoordinate:ICoordinate, wireA: string[], wireB: string[]) => {
    const wireACoords = getWireCoordinates(startCoordinate, wireA);
    const wireBCoords = getWireCoordinates(startCoordinate, wireB);
    //TODO: Improve performance for filter
    const intersections = wireACoords.filter(a => wireBCoords.some(b => a.x === b.x && a.y == b.y));
    return intersections;

}

export const calculateManhattanDistanceBetweenPoints = (from: ICoordinate, to: ICoordinate) => {
    return (Math.abs(to.x) - Math.abs(from.x)) + (Math.abs(to.y) - Math.abs(from.y));
}

export const getClosestDistance = (startCoordinate:ICoordinate, wireA:string[], wireB:string[]) => {
    const intersections = getIntersections(startCoordinate, wireA, wireB);
    const distances = intersections.map(x => calculateManhattanDistanceBetweenPoints(startCoordinate, x));
    const leastDistance = Math.min(...distances);
    return leastDistance;
}