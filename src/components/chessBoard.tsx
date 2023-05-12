import Tile from "./tile";
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

const rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
const columns = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [
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
];

export default function Chessboard() {
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

      board.push(<Tile number={number} image={image} />);
    }
  }

  return <div id="chessboard">{board}</div>;
}
