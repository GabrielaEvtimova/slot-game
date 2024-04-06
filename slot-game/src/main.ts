import config from "./data/configuration";
import SlotGame from "./slotGame";
import Reels from "./components/reels"

const {reelsCount, rowsCount, symbols, lines, reels} = config

// const reels2 = new Reels(reels)
// console.log(reels2.reels)
const slotGame: SlotGame = new SlotGame(reelsCount, rowsCount, symbols, lines, reels);
slotGame.spin();