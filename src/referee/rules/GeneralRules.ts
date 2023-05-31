import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";

export const isTileOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => p.samePosition(position));

  if (piece) {
    return true;
  } else {
    return false;
  }
};

export const isTileOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
): boolean => {
  const piece = boardState.find(
    (p) => p.samePosition(position) && p.team !== team
  );

  if (piece) {
    return true;
  } else {
    return false;
  }
};

export const isTileEmptyOrOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
) => {
  return (
    !isTileOccupied(position, boardState) ||
    isTileOccupiedByOpponent(position, boardState, team)
  );
};
