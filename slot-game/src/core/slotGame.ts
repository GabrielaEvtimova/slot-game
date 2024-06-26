import { LineResult, TotalWin } from "../types/types";
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

  get totalWin() {
    return this.#totalWin;
  }

  #renderScreen(): number[][] {
    const screen: number[][] = [];
    const listOfIndices: number[] = [];
    let reelIndex: number = 0;

    for (let i: number = 0; i < this.#reelsCount; i++) {
      const reelFirstRowIndex: number = Math.floor(
        Math.random() * this.#reels[i].length
      );
      listOfIndices.push(reelFirstRowIndex);
    }

    for (let row: number = 0; row < this.#rowsCount; row++) {
      screen[row] = [];

      for (let col: number = 0; col < this.#reelsCount; col++) {
        reelIndex = listOfIndices[col] + row;
        if (reelIndex >= this.#reels[col].length) {
          reelIndex = reelIndex % this.#reels[col].length;
        }
        const reel: number = this.#reels[col][reelIndex];
        screen[row][col] = reel;
      }
    }
    return screen;
  }

  #produceAllLinesSymbols(screen: number[][]): number[][] {
    const allLinesSymbols: number[][] = [];

    for (let i: number = 0; i < this.#lines.length; i++) {
      const line: number[] = this.#lines[i];

      const result: number[] = [];

      for (let i: number = 1; i <= line.length; i++) {
        const sreenRow: number = line[i - 1];
        const screenCol: number = i;
        const lineSymbols: number = screen[sreenRow][screenCol - 1];

        result.push(lineSymbols);
        this.#symbol = screen[sreenRow][0];
      }
      allLinesSymbols.push(result);
      this.#finalResult.push({ line: line, symbol: this.#symbol, payout: 0 });
    }

    return allLinesSymbols;
  }

  #lastCalculations(screen: number[][]): void {
    const linesSymbols: number[][] = this.#produceAllLinesSymbols(screen);

    for (let i: number = 0; i < linesSymbols.length; i++) {
      let count: number = 1;
      const line: number[] = linesSymbols[i];

      for (let j: number = 1; j <= line.length; j++) {
        const prev: number = line[j - 1];
        const curr: number = line[j];
        if (prev === curr) {
          count++;
        } else {
          break;
        }
      }

      const keyInSymbolsToFind: number = this.#finalResult[i].symbol;
      const symbolValues: number[] = this.#symbols[keyInSymbolsToFind];
      this.#finalResult[i].payout = symbolValues[count - 1];
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
