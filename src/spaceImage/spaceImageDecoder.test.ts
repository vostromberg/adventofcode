import { getLayers } from "./spaceImageDecoder";

describe("SpaceImageDecoder", () => {
    test("getLayers", () => {
        const input = "123456789012";
        const result = getLayers(input, 3,2);
        expect(result.length).toBe(2);
        expect(result[0].length).toBe(2);
        expect(result[0][1].length).toBe(3);
    });
});