import {
  Piece,
  TeamType,
  samePosition,
  Position,
} from "../../components/Constants";
import {
  isTileEmptyOrOccupiedByOpponent,
  isTileOccupied,
  isTileOccupiedByOpponent,
} from "./GeneralRules";

export const bishopMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 8; i++) {
    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x + i,
        y: initialPosition.y + i,
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

    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y < initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x + i,
        y: initialPosition.y - i,
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

    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y < initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y - i,
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

    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      const passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y + i,
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
  }
  return false;
};

export const getPossibleBishopMoves = (
  bishop: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y + i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y - i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y - i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y + i,
    };

    if (!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (isTileOccupiedByOpponent(destination, boardstate, bishop.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
