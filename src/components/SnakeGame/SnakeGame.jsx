import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const boardSize = 20;
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection([0, -1]);
          break;
        case 'ArrowDown':
          setDirection([0, 1]);
          break;
        case 'ArrowLeft':
          setDirection([-1, 0]);
          break;
        case 'ArrowRight':
          setDirection([1, 0]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const context = canvasRef.current.getContext('2d');
    const interval = setInterval(() => {
      moveSnake(context);
    }, 120);

    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  const moveSnake = (context) => {
    context.clearRect(0, 0, boardSize * 20, boardSize * 20);

    const newSnake = [...snake];
    const head = [...newSnake[0]];

    head[0] += direction[0];
    head[1] += direction[1];

    if (head[0] === food[0] && head[1] === food[1]) {
      setFood([Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]);
    } else {
      newSnake.pop();
    }

    if (head[0] < 0 || head[1] < 0 || head[0] >= boardSize || head[1] >= boardSize || isCollision(head, newSnake)) {
      setGameOver(true);
    } else {
      newSnake.unshift(head);
      setSnake(newSnake);
    }

    drawSnake(context);
    drawFood(context);
  };

  const drawSnake = (context) => {
    context.fillStyle = 'green';
    snake.forEach(segment => {
      context.fillRect(segment[0] * 20, segment[1] * 20, 20, 20);
    });
  };

  const drawFood = (context) => {
    context.fillStyle = 'red';
    context.fillRect(food[0] * 20, food[1] * 20, 20, 20);
  };

  const isCollision = (head, snake) => {
    return snake.some(segment => segment[0] === head[0] && segment[1] === head[1]);
  };

  const restartGame = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return; // Exit early if canvasRef.current is null
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return; // Exit early if context is null
    }

    context.clearRect(0, 0, boardSize * 20, boardSize * 20);

    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection([0, -1]);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Snake Game</h1>
      <canvas
        ref={canvasRef}
        width={boardSize * 20}
        height={boardSize * 20}
        style={{ border: '2px solid #333', display: gameOver ? 'none' : 'block' }}
      />
      {gameOver && (
        <div className="text-center mt-4">
          <p className="text-xl text-red-500">Game Over</p>
          <button
            onClick={restartGame}
            className="mt-2 bg-blue-500 text-white rounded p-2"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
