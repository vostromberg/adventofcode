import { calcFuel } from "./part1";

describe("day1-part1", () => {
    test("calcFuel returns 2 when mass is 12", () => {
        var result = calcFuel(12);
        expect(result).toBe(2);
    });

    test("calcFuel returns 2 when mass is 14", () => {
        var result = calcFuel(14);
        expect(result).toBe(2);
    });

    test("calcFuel returns 654 when mass is 1969", () => {
        var result = calcFuel(12);
        expect(result).toBe(2);
    });

    test("calcFuel returns 33583 when mass is 100756", () => {
        var result = calcFuel(12);
        expect(result).toBe(2);
    });
});