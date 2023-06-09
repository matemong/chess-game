import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import { isTileEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      if (desiredPosition.y - initialPosition.y === 2 * i) {
        if (desiredPosition.x - initialPosition.x === j) {
          if (
            isTileEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true;
          }
        }
      }

      if (desiredPosition.x - initialPosition.x === 2 * i) {
        if (desiredPosition.y - initialPosition.y === j) {
          if (
            isTileEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const getPossibleKnightMoves = (
  knight: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = new Position(
        knight.position.x + j,
        knight.position.y + i * 2
      );
      const horizontalMove = new Position(
        knight.position.x + i * 2,
        knight.position.y + j
      );

      if (
        isTileEmptyOrOccupiedByOpponent(verticalMove, boardstate, knight.team)
      ) {
        possibleMoves.push(verticalMove);
      }

      if (
        isTileEmptyOrOccupiedByOpponent(horizontalMove, boardstate, knight.team)
      ) {
        possibleMoves.push(horizontalMove);
      }
    }
  }

  return possibleMoves;
};
