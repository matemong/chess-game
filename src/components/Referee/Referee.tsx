import { useEffect, useRef, useState, useCallback } from "react";
import { initialBoard } from "../../Constants";
import { Piece, Position } from "../../models";
import { Board } from "../../models/Board";
import { Pawn } from "../../models/Pawn";
import { PieceType, TeamType } from "../../Types";
import {
  bishopMove,
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from "../../referee/rules";
import Chessboard from "../Chessboard/Chessboard";

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);

  const updatePossibleMoves = useCallback(() => {
    board.calculateAllMoves();
  }, [board]);

  useEffect(() => {
    updatePossibleMoves();
  }, [updatePossibleMoves]);

  function playMove(playedPiece: Piece, destination: Position): boolean {
    if (playedPiece.possibleMoves === undefined) return false;
    let playedMoveIsValid = false;

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

    setBoard((previousBoard) => {
      playedMoveIsValid = board.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination
      );

      return board.clone();
    });

    const promotionRow = playedPiece.team === TeamType.WHITE ? 7 : 0;

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn((previousPromotionPawn) => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }
    return playedMoveIsValid;
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

  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
    }

    return validMove;
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard((previousBoard) => {
      const clonedBoard = board.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(
            new Piece(piece.position.clone(), pieceType, piece.team)
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

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
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
      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  );
}
