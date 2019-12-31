export interface IOrbitRelation {
    parent: string;
    child: string;
}

export interface IOrbit {
    parent?: IOrbit;
    name: string;
    children: IOrbit[];
}

export interface IOrbits {
    [key: string]: IOrbit;
}

export const parseOrbitMap = (input: string): IOrbitRelation[] => {
    return input
        .split("\n")
        .filter(x => x !== "")
        .map<IOrbitRelation>(x => {
            const relation = x.split(")");
            return {
                parent: relation[0].trim(),
                child: relation[1].trim()
            }
        });
}

export const getOrbits = (orbitRelations: IOrbitRelation[]) => {
    const orbits: IOrbits = {};
    orbitRelations.forEach(x => {
        orbits[x.parent] = orbits[x.parent] || {
            name: x.parent,
            children: []
        };
        orbits[x.child] = orbits[x.child] || {
            name: x.child,
            children: []
        };
        orbits[x.child].parent = orbits[x.parent];
        orbits[x.parent].children.push(orbits[x.child]);
    });
    return orbits;
}

export const countOrbits = (orbit:IOrbit) => {
    let orbits = orbit.children.length;
    orbits += orbit.children.reduce((prev, curr) => prev + countOrbits(curr),0);
    return orbits;
}

export const countTotalOrbits = (orbits:IOrbits) => {
    return Object.keys(orbits).reduce((prev, curr) => prev + countOrbits(orbits[curr]), 0);
}

// export const countTotalOrbits = (orbits: IOrbits) => {
//     let count = 0;
//     Object.keys(orbits).forEach(key => {
//         //count++;
//         let currentOrbit: IOrbit | undefined = orbits[key];
//         while (currentOrbit) {
//             count++;
//             currentOrbit = currentOrbit.parent;
//         }
//     });
//     return count;
// }

// export const countTotalOrbits = (orbitRelations: IOrbitRelation[]) => {
//     const orbitCounts: { [key: string]: number } = {};
//     orbitRelations.forEach(x => {
//         orbitCounts[x.parent] = orbitCounts[x.parent] || 0;

//     });

//     return Object
//         .keys(orbitCounts)
//         .reduce((prev, curr) => prev + curr);
// }