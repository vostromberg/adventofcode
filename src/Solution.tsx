import React, { useState, useEffect } from 'react';

export interface ISolutionProps {
    name: string;
    solver: () => Promise<any>;
}

export const Solution: React.FC<ISolutionProps> = (props) => {
    const [solution, setSolution] = useState(null);
    useEffect(() => {
        props.solver().then(setSolution);
    }, []);

    return (<>
        <h4>{props.name}</h4>
        <p>{solution ? solution : "Calculating solution"}</p>
    </>);
}