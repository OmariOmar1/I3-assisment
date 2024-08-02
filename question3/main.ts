export class Connect4 {

  private board: number[][];
  private currentPlayer: number;
  private winner: number | null;

  constructor() {
    // new game starts with 6*7 board with all 0s 
      this.board = Array.from({ length: 6 }, () => Array(7).fill(0));
      this.currentPlayer = 1;
      this.winner = null;
  }

  play(col: number): string {
      if (this.winner !== null) {
          return "Game has finished!";
      }

      const row = this.findAvailableRow(col);
      if (row === -1) { // no available rows play not accepted
          return "Column full!";
      }

      this.board[row][col] = this.currentPlayer;

      if (this.checkWin(row, col)) { // we must check if every valid play is a win or not 
          this.winner = this.currentPlayer;
          return `Player ${this.currentPlayer} wins!`;
      }

      const result = `Player ${this.currentPlayer} has a turn`;
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      return result;
  }

  private findAvailableRow(col: number): number { // we check the rows form bottom to top of the board of the played col
      for (let row = 5; row >= 0; row--) {
          if (this.board[row][col] === 0) {
              return row;
          }
      }
      return -1;
  }

  private checkWin(row: number, col: number): boolean { // there are 3 wins in connect4 it must be 4 continous plays vertical and diagonal 
      return this.checkVerticalWin(row, col) || this.checkHorizontalWin(row, col) || this.checkDiagonalWin(row, col);
  }

  private checkVerticalWin(row: number, col: number): boolean {
      let count = 0;
      let disc = this.board[row][col];

      for (let r = 0; r < 6; r++) {
          if (this.board[r][col] === disc) {
              count++;
              if (count === 4) return true;
          } else {
              count = 0;
          }
      }
      return false;
  }

  private checkHorizontalWin(row: number, col: number): boolean {
      let count = 0;
      let disc = this.board[row][col];

      for (let c = 0; c < 7; c++) {
          if (this.board[row][c] === disc) {
              count++;
              if (count === 4) return true;
          } else {
              count = 0;
          }
      }
      return false;
  }

  private checkDiagonalWin(row: number, col: number): boolean {
      return this.checkDiagonalWinFromDirection(row, col, 1, 1) || this.checkDiagonalWinFromDirection(row, col, 1, -1);
  }

  private checkDiagonalWinFromDirection(row: number, col: number, rowInc: number, colInc: number): boolean {
      let count = 0;
      let disc = this.board[row][col];

      let r = row, c = col;
      while (r >= 0 && r < 6 && c >= 0 && c < 7 && this.board[r][c] === disc) {
          count++;
          r += rowInc;
          c += colInc;
      }

      r = row - rowInc;
      c = col - colInc;
      while (r >= 0 && r < 6 && c >= 0 && c < 7 && this.board[r][c] === disc) {
          count++;
          r -= rowInc;
          c -= colInc;
      }

      return count >= 4;
  }
}
