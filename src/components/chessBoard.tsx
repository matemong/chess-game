import Tile from "./Tile";
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
import { useRef, useState, useEffect } from "react";
import Referee from "../referee/Referee";

const rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
const columns = ["1", "2", "3", "4", "5", "6", "7", "8"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
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

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);

  const [pieces, setPieces] = useState<Piece[]>([]);

  const chessboardRef = useRef<HTMLDivElement>(null);

  const referee = new Referee();

  useEffect(() => {
    setPieces([
      {
        image: WhiteRookImage,
        x: 0,
        y: 0,
        type: PieceType.ROOK,
        team: TeamType.WHITE,
      },
      {
        image: WhiteKnightImage,
        x: 1,
        y: 0,
        type: PieceType.KNIGHT,
        team: TeamType.WHITE,
      },
      {
        image: WhiteBishopImage,
        x: 2,
        y: 0,
        type: PieceType.BISHOP,
        team: TeamType.WHITE,
      },
      {
        image: WhiteQueenImage,
        x: 3,
        y: 0,
        type: PieceType.QUEEN,
        team: TeamType.WHITE,
      },
      {
        image: WhiteKingImage,
        x: 4,
        y: 0,
        type: PieceType.KING,
        team: TeamType.WHITE,
      },
      {
        image: WhiteBishopImage,
        x: 5,
        y: 0,
        type: PieceType.BISHOP,
        team: TeamType.WHITE,
      },
      {
        image: WhiteKnightImage,
        x: 6,
        y: 0,
        type: PieceType.KNIGHT,
        team: TeamType.WHITE,
      },
      {
        image: WhiteRookImage,
        x: 7,
        y: 0,
        type: PieceType.ROOK,
        team: TeamType.WHITE,
      },

      {
        image: WhitePawnImage,
        x: 0,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },
      {
        image: WhitePawnImage,
        x: 1,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },
      {
        image: WhitePawnImage,
        x: 2,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },
      {
        image: WhitePawnImage,
        x: 3,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },
      {
        image: WhitePawnImage,
        x: 4,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },
      {
        image: WhitePawnImage,
        x: 5,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },
      {
        image: WhitePawnImage,
        x: 6,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },
      {
        image: WhitePawnImage,
        x: 7,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      },

      {
        image: BlackPawnImage,
        x: 0,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },
      {
        image: BlackPawnImage,
        x: 1,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },
      {
        image: BlackPawnImage,
        x: 2,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },
      {
        image: BlackPawnImage,
        x: 3,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },
      {
        image: BlackPawnImage,
        x: 4,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },
      {
        image: BlackPawnImage,
        x: 5,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },
      {
        image: BlackPawnImage,
        x: 6,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },
      {
        image: BlackPawnImage,
        x: 7,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      },

      {
        image: BlackRookImage,
        x: 0,
        y: 7,
        type: PieceType.ROOK,
        team: TeamType.BLACK,
      },
      {
        image: BlackKnightImage,
        x: 1,
        y: 7,
        type: PieceType.KNIGHT,
        team: TeamType.BLACK,
      },
      {
        image: BlackBishopImage,
        x: 2,
        y: 7,
        type: PieceType.BISHOP,
        team: TeamType.BLACK,
      },
      {
        image: BlackQueenImage,
        x: 3,
        y: 7,
        type: PieceType.QUEEN,
        team: TeamType.BLACK,
      },
      {
        image: BlackKingImage,
        x: 4,
        y: 7,
        type: PieceType.KING,
        team: TeamType.BLACK,
      },
      {
        image: BlackBishopImage,
        x: 5,
        y: 7,
        type: PieceType.BISHOP,
        team: TeamType.BLACK,
      },
      {
        image: BlackKnightImage,
        x: 6,
        y: 7,
        type: PieceType.KNIGHT,
        team: TeamType.BLACK,
      },
      {
        image: BlackRookImage,
        x: 7,
        y: 7,
        type: PieceType.ROOK,
        team: TeamType.BLACK,
      },
    ]);
  }, []);

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }
  function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessBoard = chessboardRef.current;
    if (activePiece && chessBoard) {
      const minX = chessBoard.offsetLeft - 25;
      const minY = chessBoard.offsetTop - 25;

      const maxX = chessBoard.offsetLeft + chessBoard.clientHeight - 75;
      const maxY = chessBoard.offsetTop + chessBoard.clientWidth - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }
  function dropPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      const attackedPiece = pieces.find((p) => p.x === x && p.y === y);

      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.WHITE ? 1 : -1;

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.enPassant = false;
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else if (validMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }

  const board = [];

  for (let i = columns.length - 1; i >= 0; i--) {
    for (let j = 0; j < rows.length; j++) {
      const number = i + j + 2;
      let image = undefined;

      pieces.forEach((piece) => {
        if (piece.x === j && piece.y === i) {
          image = piece.image;
        }
      });

      board.push(<Tile key={`${j}${i}`} number={number} image={image} />);
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}
