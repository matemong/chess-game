import { Piece, PieceType, TeamType } from "../components/ChessBoard";

export default class Referee {
  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    console.log("Checking if tile is occupied...");

    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    }
    return false;
  }
  isTileOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(
    previousX: number,
    previousY: number,
    currentX: number,
    currentY: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log("referee is checking the move...");
    console.log(`previous location: (${previousX},${previousY})`);
    console.log(`current location: (${currentX},${currentY})`);
    console.log(`piece type: ${type}`);
    console.log(`piece type: ${team}`);

    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.WHITE ? 1 : 6;
      const pawnDirection = team === TeamType.WHITE ? 1 : -1;

      if (
        previousX === currentX &&
        previousY === specialRow &&
        currentY - previousY === 2 * pawnDirection
      ) {
        if (
          !this.isTileOccupied(currentX, currentY, boardState) &&
          !this.isTileOccupied(currentX, currentY - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (
        previousX === currentX &&
        currentY - previousY === pawnDirection
      ) {
        if (!this.isTileOccupied(currentX, currentY, boardState)) {
          return true;
        }
      } else if (
        currentX - previousX === -1 &&
        currentY - previousY === pawnDirection
      ) {
        if (
          this.isTileOccupiedByOpponent(currentX, currentY, boardState, team)
        ) {
          return true;
        }
      } else if (
        currentX - previousX === 1 &&
        currentY - previousY === pawnDirection
      ) {
        if (
          this.isTileOccupiedByOpponent(currentX, currentY, boardState, team)
        ) {
          return true;
        }
      }

      return false;
    }
  }
}
