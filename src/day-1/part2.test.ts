import { calcFuel } from "./part2";

describe("day1-part2", () => {
    test("calcFuel returns 2 when mass is 12", () => {
        var result = calcFuel(12);
        expect(result).toBe(2);
    });

    test("calcFuel returns 966 when mass is 1969", () => {
        var result = calcFuel(1969);
        expect(result).toBe(966);
    });

    test("calcFuel returns 50346 when mass is 100756", () => {
        var result = calcFuel(100756);
        expect(result).toBe(50346);
    });
});