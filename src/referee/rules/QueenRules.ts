import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import {
  isTileEmptyOrOccupiedByOpponent,
  isTileOccupied,
  isTileOccupiedByOpponent,
} from "./GeneralRules";

export const queenMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 8; i++) {
    const multiplierX =
      desiredPosition.x < initialPosition.x
        ? -1
        : desiredPosition.x > initialPosition.x
        ? 1
        : 0;
    const multiplierY =
      desiredPosition.y < initialPosition.y
        ? -1
        : desiredPosition.y > initialPosition.y
        ? 1
        : 0;

    const passedPosition = new Position(
      initialPosition.x + i * multiplierX,
      initialPosition.y + i * multiplierY
    );

    if (passedPosition.samePosition(desiredPosition)) {
      if (isTileEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
        return true;
      }
    } else {
      if (isTileOccupied(passedPosition, boardState)) {
        break;
      }
    }
  }
  return false;
};
export const getPossibleQueenMoves = (
  queen: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = 1; i < 8; i++) {
    const destination = new Position(queen.position.x, queen.position.y + i);

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination = new Position(queen.position.x, queen.position.y - i);

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination = new Position(queen.position.x - i, queen.position.y);

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination = new Position(queen.position.x + i, queen.position.y);

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x + i,
      queen.position.y + i
    );

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x + i,
      queen.position.y - i
    );

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x - i,
      queen.position.y - i
    );

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x - i,
      queen.position.y + i
    );

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
