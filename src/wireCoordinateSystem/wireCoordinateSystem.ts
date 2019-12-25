const defaultStartCoordinate: ICoordinate = {
    x: 0, y: 0, steps: 0
}

export interface ICoordinate {
    x: number;
    y: number;
    steps: number;
}

export interface IIntersection {
    x: number;
    y: number;
    wireASteps: number;
    wireBSteps: number;
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
                return { x: lastCoordinate.x, y: lastCoordinate.y - 1, steps: lastCoordinate.steps + 1 };
            };
        case Direction.Right:
            return (lastCoordinate: ICoordinate) => {
                return { x: lastCoordinate.x + 1, y: lastCoordinate.y, steps: lastCoordinate.steps + 1 };
            };
        case Direction.Down:
            return (lastCoordinate: ICoordinate) => {
                return { x: lastCoordinate.x, y: lastCoordinate.y + 1, steps: lastCoordinate.steps + 1 };
            };
        case Direction.Left:
            return (lastCoordinate: ICoordinate) => {
                return { x: lastCoordinate.x - 1, y: lastCoordinate.y, steps: lastCoordinate.steps + 1 };
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

const getCoordKey = (coord: ICoordinate) => {
    return `${coord.x}:${coord.y}`;
}

export const getIntersections = (startCoordinate: ICoordinate, wireA: string[], wireB: string[]) => {
    const wireACoords = getWireCoordinates(startCoordinate, wireA);
    const wireBCoords = getWireCoordinates(startCoordinate, wireB);
    //Before performance improvement for filter
    //const intersections = wireACoords.filter(a => wireBCoords.some(b => a.x === b.x && a.y == b.y));

    //After performance improvement for filter
    //Map out A-coords to dictionary for faster lookup
    const wireAObj: { [key: string]: ICoordinate } = {};
    wireACoords.forEach(coord => {
        const key = getCoordKey(coord);
        if (!wireAObj[key] || wireAObj[key].steps > coord.steps) {
            wireAObj[key] = coord
        }
    });
    //Find intersections
    const intersections: IIntersection[] = wireBCoords.filter(coord => wireAObj[getCoordKey(coord)] != null).map<IIntersection>(coord => {
        const coordA = wireAObj[getCoordKey(coord)];
        return {
            x: coord.x,
            y: coord.y,
            wireASteps: coordA.steps,
            wireBSteps: coord.steps
        };
    });

    return intersections;

}

export const calculateManhattanDistanceBetweenPoints = (from: ICoordinate, to: IIntersection) => {
    return (Math.abs(to.x) - Math.abs(from.x)) + (Math.abs(to.y) - Math.abs(from.y));
}

export const getClosestIntersectionByManhattanDistance = (wireA: string[], wireB: string[], startCoordinate = defaultStartCoordinate) => {
    const intersections = getIntersections(startCoordinate, wireA, wireB);
    const distances = intersections.map(x => calculateManhattanDistanceBetweenPoints(startCoordinate, x));
    const leastDistance = Math.min(...distances);
    return leastDistance;
}

export const getClosestIntersectionBySteps = (wireA: string[], wireB: string[], startCoordinate: ICoordinate = defaultStartCoordinate) => {
    const intersections = getIntersections(startCoordinate, wireA, wireB);
    const distances = intersections.map(x => x.wireASteps + x.wireBSteps);
    const leastDistance = Math.min(...distances);
    return leastDistance;
}