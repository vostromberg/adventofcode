import { parseDirection, Direction, parseDistance, getClosestIntersectionByManhattanDistance, getClosestIntersectionBySteps } from "./wireCoordinateSystem";

describe("wireCoordinateSystem", () => {
    test("Parse directions", () => {
        const up = parseDirection("U12");
        const right = parseDirection("R12");
        const down = parseDirection("D12");
        const left = parseDirection("L12");

        expect(up).toBe(Direction.Up);
        expect(right).toBe(Direction.Right);
        expect(down).toBe(Direction.Down);
        expect(left).toBe(Direction.Left);
    });

    test("Parse distance", () => {
        const distance = parseDistance("U25");
        expect(distance).toBe(25);
    });
    test("Manhattan Distance - Test 1 should return 159", () => {
        const a = "R75,D30,R83,U83,L12,D49,R71,U7,L72".split(",");
        const b = "U62,R66,U55,R34,D71,R55,D58,R83".split(",");
        const result = getClosestIntersectionByManhattanDistance(a, b);
        expect(result).toBe(159);
    });
    test("Manhattan Distance - Test 2 should return 135", () => {
        const a = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51".split(",");
        const b = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7".split(",");
        const result = getClosestIntersectionByManhattanDistance(a, b);
        expect(result).toBe(135);
    });
    test("Steps distance - Test 1 should return 610", () => {
        const a = "R75,D30,R83,U83,L12,D49,R71,U7,L72".split(",");
        const b = "U62,R66,U55,R34,D71,R55,D58,R83".split(",");
        const result = getClosestIntersectionBySteps(a, b);
        expect(result).toBe(610);
    });
    test("MSteps distance - Test 2 should return 410", () => {
        const a = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51".split(",");
        const b = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7".split(",");
        const result = getClosestIntersectionBySteps(a, b);
        expect(result).toBe(410);
    });
});