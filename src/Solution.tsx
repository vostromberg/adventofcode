import React, { useState, useEffect } from 'react';

export interface ISolutionProps {
    name: string;
    solver: () => Promise<any>;
}

export const Solution: React.FC<ISolutionProps> = (props) => {
    const [solution, setSolution] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const solve = () => {
        setIsRunning(true);
        props.solver().then(setSolution).finally(() => setIsRunning(false));
    }
    return (<div className="solution">
        <h4>{props.name}</h4>
        {(!solution && !isRunning) && <button onClick={solve}>Show solution</button>}
        {solution && <p onClick={solve}>{solution}</p>}
        {isRunning && <p>Calculating solution</p>}
    </div>);
}