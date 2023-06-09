import { useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import { Piece, Position } from "../../models";
import { Board } from "../../models/Board";
import { Pawn } from "../../models/Pawn";
import { Move, PieceType, TeamType } from "../../Types";
import Chessboard from "../Chessboard/Chessboard";
import GameLog from "../GameLog/GameLog";



export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [gameLog, setGameLog] = useState<Move[]>([]);

  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);

  const checkmateModalRef = useRef<HTMLDivElement>(null);

  function playMove(playedPiece: Piece, destination: Position): boolean {
    if (playedPiece.possibleMoves === undefined) return false;
  
    if (playedPiece.team === TeamType.WHITE && board.totalTurns % 2 !== 1)
      return false;
    if (playedPiece.team === TeamType.BLACK && board.totalTurns % 2 !== 0)
      return false;
  
    let isCapture = false;
    let isCheck = false;
    let isCheckmate = false;
  
    const validMove = playedPiece.possibleMoves?.some((m) =>
      m.samePosition(destination)
    );
  
    if (!validMove) return false;
  
    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );
  
    setBoard((currentBoard) => {
      const clonedBoard = currentBoard.clone();
      clonedBoard.totalTurns += 1;
  
      isCapture = clonedBoard.isCapture(playedPiece, destination);
  
      const moveResult = clonedBoard.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination
      );
  
      if (moveResult.isValid) {
        isCheck = moveResult.isCheck;
        isCheckmate = moveResult.isCheckMate;
      }
  
      if (clonedBoard.winningTeam !== undefined) {
        checkmateModalRef.current?.classList.remove("hidden");
      }
  
      return clonedBoard;
    });
  
    const promotionRow = playedPiece.team === TeamType.WHITE ? 7 : 0;
  
    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn(() => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }
  
    setGameLog((prevLog) => [
      ...prevLog,
      {
        piece: playedPiece.type,
        from: playedPiece.position,
        to: destination,
        time: new Date(),
        playedPiece: playedPiece,
        isCapture: isCapture,
        isCheck: isCheck,
        isCheckMate: isCheckmate
      },
    ]);
  
    return moveResult.isValid;
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }


  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard(() => {
      const clonedBoard = board.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(
            new Piece(piece.position.clone(), pieceType, piece.team, true)
          );
        } else {
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);

      clonedBoard.calculateAllMoves();

      return clonedBoard;
    });

    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.WHITE ? "w" : "b";
  }
  function restartGame() {
    checkmateModalRef.current?.classList.add("hidden");
    setBoard(initialBoard.clone());
  }

  return (
    <>
      <p style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
        Total turns: {board.totalTurns}, {board.totalTurns % 2 ? "White" : "Black"}'s turn
      </p>
      <div className="modal hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/src/assets/img/rook_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/src/assets/img/bishop_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/src/assets/img/knight_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/src/assets/img/queen_${promotionTeamType()}.png`}
          />
        </div>
      </div>
      <div className="modal hidden" ref={checkmateModalRef}>
        <div className="modal-body">
          <div className="checkmate-body">
            <span>
              The winning team is{" "}
              {board.winningTeam === TeamType.WHITE ? "white" : "black"}!
            </span>
            <button onClick={restartGame}>Play again</button>
          </div>
        </div>
      </div>
      <Chessboard playMove={playMove} pieces={board.pieces} />
      <GameLog entries={gameLog} />
    </>
  );
}
