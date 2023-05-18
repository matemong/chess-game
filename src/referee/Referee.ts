import { PieceType, TeamType } from "../components/ChessBoard";

export default class Referee {
  isValidMove(
    previousX: number,
    previouyY: number,
    currentX: number,
    currentY: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log("referee is checking the move...");
    console.log(`previous location: (${previousX},${previouyY})`);
    console.log(`current location: (${currentX},${currentY})`);
    console.log(`piece type: ${type}`);
    console.log(`piece type: ${team}`);

    if (type === PieceType.PAWN) {
      if (team === TeamType.WHITE) {
        if (previouyY === 1) {
          if (
            previousX === currentX &&
            (currentY - previouyY === 1 || currentY - previouyY === 2)
          ) {
            console.log("valid");
            return true;
          }
        } else {
          if (previousX === currentX && currentY - previouyY === 1) {
            console.log("valid");
            return true;
          }
        }
      }

      return false;
    }
  }
}
