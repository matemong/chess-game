import {
  Piece,
  PieceType,
  Position,
  TeamType,
  samePosition,
} from "../components/Constants";

export default class Referee {
  isTileEmptyOrOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ) {
    return (
      !this.isTileOccupied(position, boardState) ||
      this.isTileOccupiedByOpponent(position, boardState, team)
    );
  }

  isTileOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isTileOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  pawnMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const specialRow = team === TeamType.WHITE ? 1 : 6;
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;

    if (
      initialPosition.x === desiredPosition.x &&
      initialPosition.y === specialRow &&
      desiredPosition.y - initialPosition.y === 2 * pawnDirection
    ) {
      if (
        !this.isTileOccupied(desiredPosition, boardState) &&
        !this.isTileOccupied(
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
      if (!this.isTileOccupied(desiredPosition, boardState)) {
        return true;
      }
    } else if (
      desiredPosition.x - initialPosition.x === -1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      console.log("upper / bottom left");
      if (this.isTileOccupiedByOpponent(desiredPosition, boardState, team)) {
        return true;
      }
    } else if (
      desiredPosition.x - initialPosition.x === 1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      console.log("upper / bottom right");
      if (this.isTileOccupiedByOpponent(desiredPosition, boardState, team)) {
        return true;
      }
    }

    return false;
  }

  knightMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        if (desiredPosition.y - initialPosition.y === 2 * i) {
          if (desiredPosition.x - initialPosition.x === j) {
            if (
              this.isTileEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }

        if (desiredPosition.x - initialPosition.x === 2 * i) {
          if (desiredPosition.y - initialPosition.y === j) {
            if (
              this.isTileEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  bishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y + i,
        };

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
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
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }

  rookMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (initialPosition.x === desiredPosition.x) {
      console.log("Moving vertically!");

      for (let i = 1; i < 8; i++) {
        const multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;

        const passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }

    if (initialPosition.y === desiredPosition.y) {
      console.log("Moving horizontally!");

      for (let i = 1; i < 8; i++) {
        const multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;

        const passedPosition: Position = {
          x: initialPosition.x + i * multiplier,
          y: initialPosition.y,
        };
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }
  queenMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      let multiplierX;
      let multiplierY;

      if (desiredPosition.x < initialPosition.x) {
        multiplierX = -1;
      } else if (desiredPosition.x > initialPosition.x) {
        multiplierX = 1;
      } else {
        multiplierX = 0;
      }

      if (desiredPosition.y < initialPosition.y) {
        multiplierY = -1;
      } else if (desiredPosition.y > initialPosition.y) {
        multiplierY = 1;
      } else {
        multiplierY = 0;
      }

      const passedPosition: Position = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      };

      if (samePosition(passedPosition, desiredPosition)) {
        if (
          this.isTileEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
        ) {
          return true;
        }
      } else {
        if (this.isTileOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  }

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = this.pawnMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KNIGHT:
        validMove = this.knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.BISHOP:
        validMove = this.bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.ROOK:
        validMove = this.rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.QUEEN:
        validMove = this.queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KING:
      //Function for the king
    }

    return validMove;
  }
}
