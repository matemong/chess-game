import {
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
  getCastlingMoves,
} from "../referee/rules";
import { PieceType, TeamType } from "../Types";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
  pieces: Piece[];
  totalTurns: number;
  winningTeam?: TeamType;

  constructor(pieces: Piece[], totalTurns: number) {
    this.pieces = pieces;
    this.totalTurns = totalTurns;
  }

  get currentTeam(): TeamType {
    return this.totalTurns % 2 === 0 ? TeamType.BLACK : TeamType.WHITE;
  }

  calculateAllMoves(): boolean {
    for (const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces);
    }

    for (const king of this.pieces.filter((p) => p.isKing)) {
      if (king.possibleMoves === undefined) continue;

      king.possibleMoves = [
        ...king.possibleMoves,
        ...getCastlingMoves(king, this.pieces),
      ];
    }

    this.checkCurrentTeamMoves();

    for (const piece of this.pieces.filter(
      (p) => p.team !== this.currentTeam
    )) {
      piece.possibleMoves = [];
    }

    const hasPossibleMoves = this.pieces
      .filter((p) => p.team === this.currentTeam)
      .some((p) => p.possibleMoves !== undefined && p.possibleMoves.length > 0);

    if (!hasPossibleMoves) {
      this.winningTeam =
        this.currentTeam === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE;
    }

    return hasPossibleMoves;
  }

  checkCurrentTeamMoves() {
    for (const piece of this.pieces.filter(
      (p) => p.team === this.currentTeam
    )) {
      if (piece.possibleMoves === undefined) continue;

      for (const move of piece.possibleMoves) {
        const simulatedBoard = this.clone();

        simulatedBoard.pieces = simulatedBoard.pieces.filter(
          (p) => !p.samePosition(move)
        );

        const clonedPiece = simulatedBoard.pieces.find((p) =>
          p.samePiecePosition(piece)
        );
        if (clonedPiece === undefined) continue;
        clonedPiece.position = move.clone();

        const clonedKing = simulatedBoard.pieces.find(
          (p) => p.isKing && p.team === simulatedBoard.currentTeam
        );
        if (clonedKing === undefined) continue;

        for (const enemy of simulatedBoard.pieces.filter(
          (p) => p.team !== simulatedBoard.currentTeam
        )) {
          enemy.possibleMoves = simulatedBoard.getValidMoves(
            enemy,
            simulatedBoard.pieces
          );

          if (enemy.isPawn) {
            if (
              enemy.possibleMoves.some(
                (m) =>
                  m.x !== enemy.position.x &&
                  m.samePosition(clonedKing.position)
              )
            ) {
              piece.possibleMoves = piece.possibleMoves?.filter(
                (m) => !m.samePosition(move)
              );
            }
          } else {
            if (
              enemy.possibleMoves.some((m) =>
                m.samePosition(clonedKing.position)
              )
            ) {
              piece.possibleMoves = piece.possibleMoves?.filter(
                (m) => !m.samePosition(move)
              );
            }
          }
        }
      }
    }
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState);
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState);
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState);
      default:
        return [];
    }
  }

  playMove(
    enPassantMove: boolean,
    validMove: boolean,
    playedPiece: Piece,
    destination: Position
  ): {isValid: boolean, isCheck: boolean, isCheckMate: boolean} {
    const pawnDirection = playedPiece.team === TeamType.WHITE ? 1 : -1;
    const destinationPiece = this.pieces.find((p) =>
      p.samePosition(destination)
    );

    const hasPossibleMoves = this.calculateAllMoves();

  const isCheck = this.isCheck(this.currentTeam);
  const isCheckMate = isCheck && !hasPossibleMoves;

  if (isCheckMate) {
    this.winningTeam =
      this.currentTeam === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE;
  }

    if (
      playedPiece.isKing &&
      destinationPiece?.isRook &&
      destinationPiece.team === playedPiece.team
    ) {
      const direction =
        destinationPiece.position.x - playedPiece.position.x > 0 ? 1 : -1;
      const newKingXPosition = playedPiece.position.x + direction * 2;
      this.pieces = this.pieces.map((p) => {
        if (p.samePiecePosition(playedPiece)) {
          p.position.x = newKingXPosition;
        } else if (p.samePiecePosition(destinationPiece)) {
          p.position.x = newKingXPosition - direction;
        }

        return p;
      });

      this.calculateAllMoves();
      return {isValid: true, isCheck: isCheck, isCheckMate: isCheckMate};
    }

    if (enPassantMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) (piece as Pawn).enPassant = false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;
          results.push(piece);
        } else if (
          !piece.samePosition(
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    } else if (validMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn)
            (piece as Pawn).enPassant =
              Math.abs(playedPiece.position.y - destination.y) === 2 &&
              piece.type === PieceType.PAWN;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;
          results.push(piece);
        } else if (!piece.samePosition(destination)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    } else {
      return {isValid: false, isCheck: isCheck, isCheckMate: isCheckMate};
    }

    return {isValid: true, isCheck: isCheck, isCheckMate: isCheckMate};
  }

  isSquareUnderAttack(position: Position, team: TeamType): boolean {
    for (const piece of this.pieces) {
      if (piece.team !== team) {
        continue;
      }
      const moves = this.getValidMoves(piece, this.pieces);
      if (moves.some((move) => move.samePosition(position))) {
        return true;
      }
    }
    return false;
  }
  isCapture(playedPiece: Piece, destination: Position): boolean {
    const destinationPiece = this.pieces.find((p) =>
      p.position.samePosition(destination)
    );
    return (
      destinationPiece !== undefined &&
      destinationPiece.team !== playedPiece.team
    );
  }
  isCheck(team: TeamType): boolean {
    const king = this.pieces.find((p) => p.isKing && p.team === team);
    if (king === undefined) {
      throw new Error("King not found");
    }

    const opponentTeam =
      team === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE;
    const opponents = this.pieces.filter((p) => p.team === opponentTeam);
    for (const opponent of opponents) {
      const validMoves = this.getValidMoves(opponent, this.pieces);
      if (validMoves.some((move) => move.samePosition(king.position))) {
        return true;
      }
    }

    return false;
  }
  isCheckMate(team: TeamType): boolean {
    const king = this.pieces.find((p) => p.isKing && p.team === team);
    if (king === undefined) {
      throw new Error("King not found");
    }

    if (!this.isCheck(team)) {
      return false;
    }

    const ownPieces = this.pieces.filter((p) => p.team === team);
    for (const piece of ownPieces) {
      const validMoves = this.getValidMoves(piece, this.pieces);
      for (const move of validMoves) {
        // Simulate the move
        const simulatedBoard = this.clone();
        const simulatedPiece = simulatedBoard.pieces.find((p) =>
          p.samePiecePosition(piece)
        );
        if (simulatedPiece === undefined) {
          continue;
        }

        simulatedPiece.position = move.clone();
        simulatedBoard.pieces = simulatedBoard.pieces.filter(
          (p) => !p.samePosition(move) || p.samePiecePosition(simulatedPiece)
        );

        if (!simulatedBoard.isCheck(team)) {
          return false;
        }
      }
    }

    return true;
  }

  clone(): Board {
    return new Board(
      this.pieces.map((p) => p.clone()),
      this.totalTurns
    );
  }
}
