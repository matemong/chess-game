import { Piece, Position, TeamType } from "../../components/Constants";
import { isTileOccupied, isTileOccupiedByOpponent } from "./GeneralRules";

export const pawnMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const specialRow = team === TeamType.WHITE ? 1 : 6;
  const pawnDirection = team === TeamType.WHITE ? 1 : -1;

  if (
    initialPosition.x === desiredPosition.x &&
    initialPosition.y === specialRow &&
    desiredPosition.y - initialPosition.y === 2 * pawnDirection
  ) {
    if (
      !isTileOccupied(desiredPosition, boardState) &&
      !isTileOccupied(
        { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
        boardState
      )
    ) {
      return true;
    }
  } else if (
    initialPosition.x === desiredPosition.x &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (!isTileOccupied(desiredPosition, boardState)) {
      return true;
    }
  } else if (
    desiredPosition.x - initialPosition.x === -1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (isTileOccupiedByOpponent(desiredPosition, boardState, team)) {
      return true;
    }
  } else if (
    desiredPosition.x - initialPosition.x === 1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (isTileOccupiedByOpponent(desiredPosition, boardState, team)) {
      return true;
    }
  }

  return false;
};

export const GetPossiblePawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  const specialRow = pawn.team === TeamType.WHITE ? 1 : 6;
  const pawnDirection = pawn.team === TeamType.WHITE ? 1 : -1;

  if (
    !isTileOccupied(
      { x: pawn.position.x, y: pawn.position.y + pawnDirection },
      boardState
    )
  ) {
    possibleMoves.push({
      x: pawn.position.x,
      y: pawn.position.y + pawnDirection,
    });

    if (
      pawn.position.y === specialRow &&
      !isTileOccupied(
        { x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 },
        boardState
      )
    ) {
      possibleMoves.push({
        x: pawn.position.x,
        y: pawn.position.y + pawnDirection * 2,
      });
    }
  }

  return possibleMoves;
};
