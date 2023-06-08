import { PieceType } from "../../Types";
import { Move } from "../../Types";

interface GameLogProps {
  entries: Move[];
}

export default function GameLog({ entries }: GameLogProps) {

  function moveToNotation(move: Move): string {
    let notation = '';
  
    if (move.piece !== PieceType.PAWN) {
      notation += move.piece.charAt(0).toUpperCase();
    } else if (move.isCapture) {
      notation += String.fromCharCode('a'.charCodeAt(0) + move.from.x);
    }
  
    if (move.isCapture) {
      notation += 'x';
    }
  
    notation += String.fromCharCode('a'.charCodeAt(0) + move.to.x) + (8 - move.to.y);
  
    if (move.isCheckMate) {
      notation += '#';
    } else if (move.isCheck) {
      notation += '+';
    }
  
    return notation;
  }

  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>
          {`Turn ${index + 1}: ${moveToNotation(entry)}`}
        </li>
      ))}
    </ul>
  );
}
