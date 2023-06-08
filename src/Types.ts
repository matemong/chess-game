import { Piece, Position } from "./models";

export enum PieceType {
    PAWN = 'pawn',
    BISHOP = 'bishop',
    KNIGHT = 'knight',
    ROOK = 'rook',
    QUEEN = 'queen',
    KING = 'king',
}

export enum TeamType {
    BLACK = 'b',
    WHITE = 'w',
}

export type Move = {
    piece: PieceType;
    from: Position;
    to: Position;
    time: Date;
    playedPiece: Piece;
    isCapture: boolean;
    isCheckMate: boolean;
    isCheck: boolean;
  }