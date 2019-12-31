import { parseOrbitMap, getOrbits, countTotalOrbits } from './orbitMapCalculator';
describe("orbitMapCalculator", () => {
    const orbitMap = `
    COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L`

    test("parseMap should return 11", () => {
        const relations = parseOrbitMap(orbitMap);
        expect(relations.length).toBe(11);
    });

    test("getOrbits should return correct structure", () => {
        const orbits = getOrbits(parseOrbitMap(orbitMap));
        expect(orbits["B"]).not.toBe(null);
        expect(orbits["B"].name).toBe("B");
        expect(orbits["B"].children.length).toBe(2);
    });

    test("Count Orbit should return 42", ()  => {
        const orbits = getOrbits(parseOrbitMap(orbitMap));
        const result = countTotalOrbits(orbits);
        expect(result).toBe(42);
    })
})