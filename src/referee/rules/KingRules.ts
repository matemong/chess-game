import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import {
  isTileEmptyOrOccupiedByOpponent,
  isTileOccupied,
  isTileOccupiedByOpponent,
} from "./GeneralRules";

export const kingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
  for (let i = 1; i < 2; i++) {
    const multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
    const multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;

    const passedPosition = new Position(initialPosition.x + (i * multiplierX), initialPosition.y + (i * multiplierY));

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
}

export const getPossibleKingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x, king.position.y + i);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }

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
    const destination = new Position(king.position.x, king.position.y - i);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }

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
    const destination = new Position(king.position.x - i, king.position.y);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }

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
    const destination = new Position(king.position.x + i, king.position.y);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }

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
    const destination = new Position(king.position.x + i, king.position.y + i);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }

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
    const destination = new Position(king.position.x + i, king.position.y - i);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }

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
    const destination = new Position(king.position.x - i, king.position.y - i);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }

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
    const destination = new Position(king.position.x - i, king.position.y + i);

    if(destination.x < 0 || destination.x > 7 
      || destination.y < 0 || destination.y > 7) {
        break;
    }
    
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
}

export const getCastlingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  if (king.hasMoved) return possibleMoves;

  const rooks = boardstate.filter(p => p.isRook
    && p.team === king.team && !p.hasMoved);

  for (const rook of rooks) {
    const direction = (rook.position.x - king.position.x > 0) ? 1 : -1;

    const adjacentPosition = king.position.clone();
    adjacentPosition.x += direction;

    if(!rook.possibleMoves?.some(m => m.samePosition(adjacentPosition))) continue;


    const conceringTiles = rook.possibleMoves.filter(m => m.y === king.position.y);

    const enemyPieces = boardstate.filter(p => p.team !== king.team);

    let valid = true;

    for(const enemy of enemyPieces) {
      if(enemy.possibleMoves === undefined) continue;

      for(const move of enemy.possibleMoves) {
        if(conceringTiles.some(t => t.samePosition(move))) {
          valid = false;
        }

        if(!valid)
          break;
      }

      if(!valid)
        break;
    }

    if(!valid) continue;
    possibleMoves.push(rook.position.clone());
  }


  return possibleMoves;
}