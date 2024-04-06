import config from "./data/configuration";
import SlotGame from "./slotGame";

const { reelsCount, rowsCount, symbols, lines, reels } = config;

const slotGame: SlotGame = new SlotGame(
  reelsCount,
  rowsCount,
  symbols,
  lines,
  reels
);
slotGame.spin();


/** Uncomment to test a simple simulation script that iterates a large amount of spins with information about total wins, bets and execution speed */

/** Define the number of spins */
const numSpins: number = 15;

/** Define the bet amount per spin */
const betAmount: number = 1;

let totalWins: number = 0;
const startTime: number = Date.now();

for (let i = 0; i < numSpins; i++) {
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

const executionTime = Date.now() - startTime;

/** Output simulation results */
console.log("=========================================================");
console.log(`Total wins: ${totalWins}`);
console.log(`Total bets: ${numSpins * betAmount}`);
console.log(`Execution time: ${executionTime} milliseconds`);
console.log(
  `Average time per spin: ${(executionTime / numSpins).toFixed(2)} milliseconds`
);

