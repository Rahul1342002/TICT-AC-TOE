import { useState } from "react";
import "./index.css"; // Make sure Tailwind is imported here

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);

  // Winning logic
  const calculateWinner = (board) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a,b,c] };
      }
    }
    return null;
  };

  const handleBoxClick = (index) => {
    if (board[index] || winnerInfo) return; // ignore if filled or game over
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const win = calculateWinner(newBoard);
    if (win) setWinnerInfo(win);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinnerInfo(null);
  };

  const isDraw = !board.includes(null) && !winnerInfo;

  return (
    <div className="min-h-screen bg-sky-950 flex flex-col items-center justify-start p-8">
      <h1 className="text-6xl text-center font-bold text-white mb-6">Tic Tac Toe</h1>

      <div className="w-96 h-96 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => {
            const highlight = winnerInfo?.line.includes(index);
            return (
              <div
                key={index}
                onClick={() => handleBoxClick(index)}
                className={`w-24 h-24 border border-gray-300 flex justify-center items-center text-4xl cursor-pointer hover:bg-gray-100 
                  ${highlight ? "bg-green-300 font-bold" : ""}
                `}
              >
                <span className={cell === "X" ? "text-red-500" : "text-blue-500"}>{cell}</span>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-xl text-white mt-6">
        {winnerInfo
          ? `Winner: ${winnerInfo.winner}`
          : isDraw
            ? "It's a Draw!"
            : `Next Player: ${isXTurn ? "X" : "O"}`
        }
      </h2>

      <button
        onClick={restartGame}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Restart Game
      </button>
    </div>
  );
}

export default App;
