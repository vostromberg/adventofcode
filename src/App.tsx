import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Solution } from './Solution';
import { day1part1 } from './day-1/part1';
import { day1part2 } from './day-1/part2';
import { day2part1 } from './day-2/part1';
import { day2part2 } from './day-2/part2';

const App: React.FC = () => {
  return (
    <div className="App">
      <Solution name="Day 1 - Part 1" solver={day1part1} />
      <Solution name="Day 1 - Part 2" solver={day1part2} />
      <Solution name="Day 2 - Part 1" solver={day2part1} />
      <Solution name="Day 2 - Part 2" solver={day2part2} />

    </div>
  );
}

export default App;
