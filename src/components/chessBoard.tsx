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

const rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
const columns = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);

  const [pieces, setPieces] = useState<Piece[]>([]);

  const chessboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPieces([
      { image: WhiteRookImage, x: 0, y: 0 },
      { image: WhiteKnightImage, x: 1, y: 0 },
      { image: WhiteBishopImage, x: 2, y: 0 },
      { image: WhiteQueenImage, x: 3, y: 0 },
      { image: WhiteKingImage, x: 4, y: 0 },
      { image: WhiteBishopImage, x: 5, y: 0 },
      { image: WhiteKnightImage, x: 6, y: 0 },
      { image: WhiteRookImage, x: 7, y: 0 },

      { image: WhitePawnImage, x: 0, y: 1 },
      { image: WhitePawnImage, x: 1, y: 1 },
      { image: WhitePawnImage, x: 2, y: 1 },
      { image: WhitePawnImage, x: 3, y: 1 },
      { image: WhitePawnImage, x: 4, y: 1 },
      { image: WhitePawnImage, x: 5, y: 1 },
      { image: WhitePawnImage, x: 6, y: 1 },
      { image: WhitePawnImage, x: 7, y: 1 },

      { image: BlackPawnImage, x: 0, y: 6 },
      { image: BlackPawnImage, x: 1, y: 6 },
      { image: BlackPawnImage, x: 2, y: 6 },
      { image: BlackPawnImage, x: 3, y: 6 },
      { image: BlackPawnImage, x: 4, y: 6 },
      { image: BlackPawnImage, x: 5, y: 6 },
      { image: BlackPawnImage, x: 6, y: 6 },
      { image: BlackPawnImage, x: 7, y: 6 },

      { image: BlackRookImage, x: 0, y: 7 },
      { image: BlackKnightImage, x: 1, y: 7 },
      { image: BlackBishopImage, x: 2, y: 7 },
      { image: BlackQueenImage, x: 3, y: 7 },
      { image: BlackKingImage, x: 4, y: 7 },
      { image: BlackBishopImage, x: 5, y: 7 },
      { image: BlackKnightImage, x: 6, y: 7 },
      { image: BlackRookImage, x: 7, y: 7 },
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

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
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
