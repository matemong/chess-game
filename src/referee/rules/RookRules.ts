import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import {
  isTileEmptyOrOccupiedByOpponent,
  isTileOccupied,
  isTileOccupiedByOpponent,
} from "./GeneralRules";

export const rookMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
  if(initialPosition.x === desiredPosition.x) {
    for(let i = 1; i < 8; i++) {
      const multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;

      const passedPosition = new Position(initialPosition.x, initialPosition.y + (i * multiplier));
      if(passedPosition.samePosition(desiredPosition)) {
        if(isTileEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if(isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
  }

  if(initialPosition.y === desiredPosition.y) {
    for(let i = 1; i < 8; i++) {
      const multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;

      const passedPosition = new Position(initialPosition.x + (i * multiplier), initialPosition.y);
      if(passedPosition.samePosition(desiredPosition)) {
        if(isTileEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if(isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
  }
  return false;
}

export const getPossibleRookMoves = (rook: Piece, boardstate: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  for(let i = 1; i < 8; i++) {
    if(rook.position.y + i > 7) break;
    const destination = new Position(rook.position.x, rook.position.y + i);

    if(!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(isTileOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for(let i = 1; i < 8; i++) {
    if(rook.position.y - i < 0) break;

    const destination = new Position(rook.position.x, rook.position.y - i);

    if(!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(isTileOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for(let i = 1; i < 8; i++) {
    if(rook.position.x - i < 0) break;

    const destination = new Position(rook.position.x - i, rook.position.y);

    if(!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(isTileOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for(let i = 1; i < 8; i++) {
    if(rook.position.x + i > 7) break;

    const destination = new Position(rook.position.x + i, rook.position.y);

    if(!isTileOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if(isTileOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
}