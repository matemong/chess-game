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
    }
    return false;
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

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    if (type === PieceType.PAWN) {
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
          {
            return true;
          }
        } else if (
          desiredPosition.x - initialPosition.x === -1 &&
          desiredPosition.y - initialPosition.y === pawnDirection
        ) {
          if (
            this.isTileOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true;
          }
        } else if (
          desiredPosition.x - initialPosition.x === 1 &&
          desiredPosition.y - initialPosition.y === pawnDirection
        ) {
          if (
            this.isTileOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true;
          }
        }

        return false;
      }
    } else if (type === PieceType.KNIGHT) {
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
    } else if (type === PieceType.BISHOP) {
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
    }

    return false;
  }
}
