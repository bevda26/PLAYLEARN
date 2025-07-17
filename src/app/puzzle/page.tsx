'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// AI-generated messages
const winningMessages = [
    "You've done it! The puzzle bows to your superior intellect!",
    "A true master of the tiles! Your victory is legendary.",
    "The numbers have aligned! A testament to your sharp mind.",
    "Brilliant! You've conquered the chaos and restored order."
];

const losingMessages = [
    "Time's up! The puzzle remains a jumbled mess. Better luck next time!",
    "The clock has defeated you! The numbers mock your attempts.",
    "Alas, the puzzle has bested you. The solution was just out of reach!",
    "You've been outsmarted by a bunch of sliding squares. How does it feel?"
];

const getRandomMessage = (messages: string[]) => messages[Math.floor(Math.random() * messages.length)];

const PuzzleGame = () => {
    const [tiles, setTiles] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(120);
    const [isGameActive, setIsGameActive] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const emptyTile = 16; // Representing the empty space

    const shuffle = useCallback(() => {
        let newTiles = Array.from({ length: 16 }, (_, i) => i + 1);
        let emptyIndex = 15;

        // Perform a large number of random moves to shuffle, ensuring solvability
        for (let i = 0; i < 1000; i++) {
            const neighbors = [];
            const row = Math.floor(emptyIndex / 4);
            const col = emptyIndex % 4;

            if (row > 0) neighbors.push(emptyIndex - 4); // top
            if (row < 3) neighbors.push(emptyIndex + 4); // bottom
            if (col > 0) neighbors.push(emptyIndex - 1); // left
            if (col < 3) neighbors.push(emptyIndex + 1); // right
            
            const randomIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
            
            [newTiles[emptyIndex], newTiles[randomIndex]] = [newTiles[randomIndex], newTiles[emptyIndex]];
            emptyIndex = randomIndex;
        }

        setTiles(newTiles);
    }, []);

    const startGame = useCallback(() => {
        shuffle();
        setMoves(0);
        setTime(120);
        setIsGameActive(true);
    }, [shuffle]);

    const isSolved = (currentTiles: number[]) => {
        for (let i = 0; i < 15; i++) {
            if (currentTiles[i] !== i + 1) {
                return false;
            }
        }
        return currentTiles[15] === emptyTile;
    };
    
    useEffect(() => {
        if (isGameActive && isSolved(tiles)) {
            setIsGameActive(false);
            if (timerId) clearInterval(timerId);
            setTimeout(() => alert(getRandomMessage(winningMessages)), 100);
        }
    }, [tiles, isGameActive, timerId]);

    useEffect(() => {
        if (isGameActive && time > 0) {
            const timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
            setTimerId(timer);
            return () => clearInterval(timer);
        } else if (time === 0) {
            if (timerId) clearInterval(timerId);
            if(isGameActive) {
                setIsGameActive(false);
                alert(getRandomMessage(losingMessages));
            }
        }
    }, [isGameActive, time, timerId]);

    const handleTileClick = (index: number) => {
        if (!isGameActive) return;

        const emptyIndex = tiles.indexOf(emptyTile);
        const tileRow = Math.floor(index / 4);
        const tileCol = index % 4;
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;

        const isAdjacent = Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol) === 1;

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
            setMoves(prevMoves => prevMoves + 1);
        }
    };
    
    useEffect(() => {
      startGame();
    }, [startGame]);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white min-h-screen">
            <Card className="w-full max-w-md bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-center text-2xl text-yellow-400">15-Puzzle Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg">Moves: <span className="font-bold text-green-400">{moves}</span></div>
                        <div className="text-lg">Time: <span className="font-bold text-red-400">{time}s</span></div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 p-2 bg-gray-900 rounded-lg">
                        {tiles.map((tile, index) => (
                            <div
                                key={index}
                                onClick={() => handleTileClick(index)}
                                className={`flex items-center justify-center h-20 w-20 text-2xl font-bold rounded-md transition-all duration-300 ease-in-out
                                    ${tile === emptyTile ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-500'}
                                    ${isGameActive ? 'cursor-pointer' : 'cursor-not-allowed'}
                                `}
                            >
                                {tile !== emptyTile ? tile : ''}
                            </div>
                        ))}
                    </div>
                    <Button onClick={startGame} className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold">
                        New Game
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default PuzzleGame;
