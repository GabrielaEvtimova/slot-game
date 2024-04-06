import { LineResult, TotalWin } from "./types/types";
export default class SlotGame {
  #reelsCount: number;
  #rowsCount: number;
  #symbols: { [key: number]: number[] };
  #lines: number[][];
  #reels: number[][];
  #finalResult: LineResult[] = [];
  #totalWin: TotalWin = 0;
  #symbol: number = 0;

  constructor(
    reelsCount: number,
    rowsCount: number,
    symbols: { [key: number]: number[] },
    lines: number[][],
    reels: number[][]
  ) {
    this.#reelsCount = reelsCount;
    this.#rowsCount = rowsCount;
    this.#symbols = symbols;
    this.#lines = lines;
    this.#reels = reels;
  }

  #renderScreen(): number[][] {
    const screen: number[][] = [];

    for (let row = 0; row < this.#rowsCount; row++) {
      screen[row] = [];

      for (let col = 0; col < this.#reelsCount; col++) {
        const reelIndex = Math.floor(Math.random() * this.#reels[col].length);
        const reel = this.#reels[col][reelIndex];
        screen[row][col] = reel;
      }
    }
    return screen;
  }

  #produceAllLinesSymbols(screen: number[][]): number[][] {
    const allLinesSymbols: number[][] = [];

    for (let i = 0; i < this.#lines.length; i++) {
      const line = this.#lines[i];

      const result: number[] = [];

      for (let i = 1; i <= line.length; i++) {
        const matrixRow: number = line[i - 1];
        const matrixCol: number = i;
        const lineSymbols: number = screen[matrixRow][matrixCol - 1];

        result.push(lineSymbols);
        this.#symbol = screen[matrixRow][0];
      }
      allLinesSymbols.push(result);
      this.#finalResult.push({ line: line, symbol: this.#symbol, payout: 0 });
    }

    return allLinesSymbols;
  }

  #lastCalculations(screen: number[][]): void {
    const result: number[] = [];
    const linesSymbols = this.#produceAllLinesSymbols(screen);

    for (let i = 0; i < linesSymbols.length; i++) {
      let count = 1;
      const line = linesSymbols[i];

      for (let j = 1; j <= line.length; j++) {
        const prev = line[j - 1];
        const curr = line[j];
        if (prev === curr) {
          count++;
        } else {
          break;
        }
      }

      const keyInSymbolsToFind = this.#finalResult[i].symbol;
      const values = this.#symbols[keyInSymbolsToFind];
      this.#finalResult[i].payout = values[count - 1];
      this.#totalWin += this.#finalResult[i].payout;
    }

    console.log(this.#finalResult);
    console.log(`You won: ${this.#totalWin}`);
  }

  spin(): void {
    const screen: number[][] = this.#renderScreen();
    console.log("Screen:");
    console.table(screen);

    console.log("Lines:");
    this.#lastCalculations(screen);
  }
}
