import { reactive } from "vue";

export type Direction = "up" | "down" | "left" | "right";
type Entities = "C" | `B${number}` | "";

interface State {
  direction: Direction;
  gridSize: number;
  grid: Entities[][];
  row: () => number;
  col: () => number;
  move: (direction: Direction) => void;
  reset: () => void;
}

export const state = reactive<State>({
  direction: "right",
  gridSize: 6,
  grid: [
    ["C", "", "", "", "", ""],
    ["", "", "", "", "B1", ""],
    ["", "", "B2", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "B3", "", "", "", ""],
    ["", "", "", "", "", ""],
  ],
  row() {
    return this.grid.findIndex((row) => row.includes("C"));
  },
  col() {
    return this.grid[this.row()].findIndex((cell) => cell === "C");
  },
  move(direction: Direction) {
    this.direction = direction;

    const oldRow = this.row();
    const oldCol = this.col();

    let delta = { row: -1, col: 0 };
    if (direction === "down") {
      delta = { row: 1, col: 0 };
    } else if (direction === "left") {
      delta = { row: 0, col: -1 };
    } else if (direction === "right") {
      delta = { row: 0, col: 1 };
    }

    if (this.grid[oldRow + delta.row]?.[oldCol + delta.col] === "") {
      this.grid[oldRow][oldCol] = "";
      this.grid[oldRow + delta.row][oldCol + delta.col] = "C";
    } else if (
      this.grid[oldRow + delta.row]?.[oldCol + delta.col]?.startsWith("B")
    ) {
      if (this.grid[oldRow + delta.row * 2]?.[oldCol + delta.col * 2] === "") {
        this.grid[oldRow][oldCol] = "";
        this.grid[oldRow + delta.row * 2][oldCol + delta.col * 2] =
          this.grid[oldRow + delta.row][oldCol + delta.col];
        this.grid[oldRow + delta.row][oldCol + delta.col] = "C";
      }
    }
  },
  reset() {
    this.grid = [
      ["C", "", "", "", "", ""],
      ["", "", "", "", "B1", ""],
      ["", "", "B2", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "B3", "", "", "", ""],
      ["", "", "", "", "", ""],
    ];
  },
});
