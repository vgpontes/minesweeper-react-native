import { View, Text } from "react-native"
import FieldItem from "./Field";

interface MinesweeperProps {
    boardWidth : number,
    boardHeight : number,
    numMines : number
}

class Minesweeper {
    board : number[][];
    boardWidth : number;
    boardHeight : number;
    numMines: number;

    constructor(props : MinesweeperProps) {
        this.board = new Array(props.boardHeight).fill(0).map(() => (new Array(props.boardWidth).fill(0)));
        this.boardWidth = props.boardWidth;
        this.boardHeight = props.boardHeight;
        this.numMines = props.numMines;
        this.placeMines();
    }

    printBoard() {
        var text = "";
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                text += this.board[i][j] + "   ";
            }
            text += "\n"
        }
        console.log(text + "\n\n\n\n\n")
    }

    private placeMines() {
        var placedMines = 0;
        while (placedMines < this.numMines) {
            const randX = Math.floor(Math.random() * (this.boardWidth));
            const randY = Math.floor(Math.random() * (this.boardHeight));
            if (this.board[randX][randY] != 1) {
                this.board[randX][randY] = -1 // place bomb
                this.calculateNeighbors(randX, randY);
                placedMines++;
            }
        }
    }

    private calculateNeighbors(i, j) {
        this.addNeighbor(i + 1, j);
        this.addNeighbor(i - 1, j);
        this.addNeighbor(i, j + 1);
        this.addNeighbor(i, j - 1);
        this.addNeighbor(i + 1, j + 1);
        this.addNeighbor(i + 1, j - 1);
        this.addNeighbor(i - 1, j + 1);
        this.addNeighbor(i - 1, j - 1);
    }

    private addNeighbor(i, j) {
        if (i < 0 || i > this.boardWidth - 1 || j < 0 || j > this.boardHeight - 1) return;
        else if (this.board[i][j] == -1) return;
        else {
            this.board[i][j]++;
        }
    }
}

export default function MinesweeperGame(props: MinesweeperProps) {
    const game = new Minesweeper(props);
    game.printBoard()
    return (
        <div className="grid">
            {game.board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((number, colIndex) => (
                        <span key={`${rowIndex}-${colIndex}`} className="cell">
                            {number}
                        </span>
                    ))}
                </div>
            ))}
    </div>
    );
} 