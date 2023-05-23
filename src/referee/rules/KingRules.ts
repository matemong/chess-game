import { Piece, Position, samePosition, TeamType } from "../../Constants";
import {
  isTileEmptyOrOccupiedByOpponent,
  isTileOccupied,
  isTileOccupiedByOpponent,
} from "./GeneralRules";

export const kingMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 2; i++) {
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

    const passedPosition: Position = {
      x: initialPosition.x + i * multiplierX,
      y: initialPosition.y + i * multiplierY,
    };

    if (samePosition(passedPosition, desiredPosition)) {
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

export const getPossibleKingMoves = (
  king: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x,
      y: king.position.y + i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x,
      y: king.position.y - i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x - i,
      y: king.position.y,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x + i,
      y: king.position.y,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x + i,
      y: king.position.y + i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x + i,
      y: king.position.y - i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x - i,
      y: king.position.y - i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x - i,
      y: king.position.y + i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
