import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Solution } from './Solution';
import { day1part1 } from './day-1/part1';
import { day1part2 } from './day-1/part2';
import { day2part1 } from './day-2/part1';
import { day2part2 } from './day-2/part2';
import { day3part1 } from './day-3/part1';
import { day3part2 } from './day-3/part2';
import { day4part2, day4part1 } from './day-4/day4';
import { day5part1, day5part2 } from './day-5/day5';
import { day6part2, day6part1 } from './day-6/day6';
import { day7part1, day7part2 } from './day-7/day7';
import { day8part2, day8part1 } from './day-8/day8';
import { day9part1, day9part2 } from './day-9/day9';

const App: React.FC = () => {
  return (
    <div className="solutions">
      <Solution name="Day 1 - Part 1" solver={day1part1} />
      <Solution name="Day 1 - Part 2" solver={day1part2} />
      <Solution name="Day 2 - Part 1" solver={day2part1} />
      <Solution name="Day 2 - Part 2" solver={day2part2} />
      <Solution name="Day 3 - Part 1" solver={day3part1} />
      <Solution name="Day 3 - Part 2" solver={day3part2} />
      <Solution name="Day 4 - Part 1" solver={day4part1} />
      <Solution name="Day 4 - Part 2" solver={day4part2} />
      <Solution name="Day 5 - Part 1" solver={day5part1} />
      <Solution name="Day 5 - Part 2" solver={day5part2} />
      <Solution name="Day 6 - Part 1" solver={day6part1} />
      <Solution name="Day 6 - Part 2" solver={day6part2} />
      <Solution name="Day 7 - Part 1" solver={day7part1} />
      <Solution name="Day 7 - Part 2" solver={day7part2} />
      <Solution name="Day 8 - Part 1" solver={day8part1} />
      <Solution name="Day 8 - Part 2" solver={day8part2} />
      <Solution name="Day 9 - Part 1" solver={day9part1} />
      <Solution name="Day 9 - Part 2" solver={day9part2} />
    </div>
  );
}

export default App;
