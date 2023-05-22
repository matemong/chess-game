import WhitePawnImage from "../assets/img/pawn_w.png";
import BlackPawnImage from "../assets/img/pawn_b.png";
import WhiteBishopImage from "../assets/img/bishop_w.png";
import BlackBishopImage from "../assets/img/bishop_b.png";
import WhiteKingImage from "../assets/img/king_w.png";
import BlackKingImage from "../assets/img/king_b.png";
import WhiteKnightImage from "../assets/img/knight_w.png";
import BlackKnightImage from "../assets/img/knight_b.png";
import WhiteQueenImage from "../assets/img/queen_w.png";
import BlackQueenImage from "../assets/img/queen_b.png";
import WhiteRookImage from "../assets/img/rook_w.png";
import BlackRookImage from "../assets/img/rook_b.png";

export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100;

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum TeamType {
  BLACK,
  WHITE,
}

export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
  possibleMoves?: Position[];
}

export const initialBoardState: Piece[] = [
  {
    image: WhiteRookImage,
    position: {
      x: 0,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.WHITE,
  },
  {
    image: WhiteKnightImage,
    position: {
      x: 1,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.WHITE,
  },
  {
    image: WhiteBishopImage,
    position: {
      x: 2,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.WHITE,
  },
  {
    image: WhiteQueenImage,
    position: {
      x: 3,
      y: 0,
    },
    type: PieceType.QUEEN,
    team: TeamType.WHITE,
  },
  {
    image: WhiteKingImage,
    position: {
      x: 4,
      y: 0,
    },
    type: PieceType.KING,
    team: TeamType.WHITE,
  },
  {
    image: WhiteBishopImage,
    position: {
      x: 5,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.WHITE,
  },
  {
    image: WhiteKnightImage,
    position: {
      x: 6,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.WHITE,
  },
  {
    image: WhiteRookImage,
    position: {
      x: 7,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.WHITE,
  },

  {
    image: WhitePawnImage,
    position: {
      x: 0,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: WhitePawnImage,
    position: {
      x: 1,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: WhitePawnImage,
    position: {
      x: 2,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: WhitePawnImage,
    position: {
      x: 3,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: WhitePawnImage,
    position: {
      x: 4,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: WhitePawnImage,
    position: {
      x: 5,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: WhitePawnImage,
    position: {
      x: 6,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },
  {
    image: WhitePawnImage,
    position: {
      x: 7,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.WHITE,
  },

  {
    image: BlackPawnImage,
    position: {
      x: 0,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: BlackPawnImage,
    position: {
      x: 1,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: BlackPawnImage,
    position: {
      x: 2,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: BlackPawnImage,
    position: {
      x: 3,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: BlackPawnImage,
    position: {
      x: 4,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: BlackPawnImage,
    position: {
      x: 5,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: BlackPawnImage,
    position: {
      x: 6,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },
  {
    image: BlackPawnImage,
    position: {
      x: 7,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.BLACK,
  },

  {
    image: BlackRookImage,
    position: {
      x: 0,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.BLACK,
  },
  {
    image: BlackKnightImage,
    position: {
      x: 1,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.BLACK,
  },
  {
    image: BlackBishopImage,
    position: {
      x: 2,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.BLACK,
  },
  {
    image: BlackQueenImage,
    position: {
      x: 3,
      y: 7,
    },
    type: PieceType.QUEEN,
    team: TeamType.BLACK,
  },
  {
    image: BlackKingImage,
    position: {
      x: 4,
      y: 7,
    },
    type: PieceType.KING,
    team: TeamType.BLACK,
  },
  {
    image: BlackBishopImage,
    position: {
      x: 5,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.BLACK,
  },
  {
    image: BlackKnightImage,
    position: {
      x: 6,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.BLACK,
  },
  {
    image: BlackRookImage,
    position: {
      x: 7,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.BLACK,
  },
];
