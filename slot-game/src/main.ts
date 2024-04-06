import config from "./data/configuration";
import SlotGame from "./slotGame";

const { reelsCount, rowsCount, symbols, lines, reels } = config;

// /**Uncomment to try a single spin */
// const slotGame: SlotGame = new SlotGame(
//   reelsCount,
//   rowsCount,
//   symbols,
//   lines,
//   reels
// );
// slotGame.spin();


/** A simple simulation script that iterates a large amount of spins with information about total wins, bets and execution speed */

/** Define the number of spins */
const numSpins: number = 1000;

/** Define the bet amount per spin */
const betAmount: number = 1;

let totalWins: number = 0;
const startTime: number = Date.now();

for (let spin: number = 0; spin < numSpins; spin++) {
  const slotGame: SlotGame = new SlotGame(
    reelsCount,
    rowsCount,
    symbols,
    lines,
    reels
  );
  console.log("--------------------------------------------------------");
  slotGame.spin();
  totalWins += slotGame.totalWin;
}

const executionTime: number = Date.now() - startTime;

/** Output simulation results */
console.log("=========================================================");
console.log(`Total wins: ${totalWins}`);
console.log(`Total bets: ${numSpins * betAmount}`);
console.log(`Execution time: ${(executionTime / 1000).toFixed(2)} seconds`);
console.log(
  `Average time per spin: ${(executionTime / numSpins).toFixed(2)} milliseconds`
);

