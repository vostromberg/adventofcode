import { parseOrbitMap, getOrbits, countTotalOrbits, findCommonAncestor, isAncestorOf, findMinimumOrbitalTransfers } from './orbitMapCalculator';
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

    test("FindCommonAncestor between YOU and SAN is D", () => {
        const orbitMap = `COM)B
        B)C
        C)D
        D)E
        E)F
        B)G
        G)H
        D)I
        E)J
        J)K
        K)L
        K)YOU
        I)SAN`;
        const commonAncestor = findCommonAncestor(getOrbits(parseOrbitMap(orbitMap)), "YOU", "SAN");
        expect(commonAncestor.name).toBe("D");

    });

    test("Distsance between YOU and SAN is 4", () => {
        const map = `COM)B
        B)C
        C)D
        D)E
        E)F
        B)G
        G)H
        D)I
        E)J
        J)K
        K)L
        K)YOU
        I)SAN`;
        const orbits = getOrbits(parseOrbitMap(map));
        const result = findMinimumOrbitalTransfers(orbits, "YOU", "SAN");
        expect(result).toBe(4);
    })

    test("B is ancestor of E", () => {
        const orbits = getOrbits(parseOrbitMap(orbitMap));
        const result = isAncestorOf(orbits, "B", "E");
        expect(result).toBe(true);
    })
})