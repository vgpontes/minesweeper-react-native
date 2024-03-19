export interface MinesweeperProps {
    boardWidth : number,
    boardHeight : number,
    numMines : number
}

export class Minesweeper {
    readonly board : number[][];
    readonly flags : boolean[][];
    readonly revealed : boolean[][]
    readonly boardWidth : number;
    readonly boardHeight : number;
    readonly numMines: number;

    constructor(props : MinesweeperProps) {
        this.board = new Array(props.boardHeight).fill(0).map(() => (new Array(props.boardWidth).fill(0)));
        this.flags = this.revealed = new Array(props.boardHeight).fill(false).map(() => (new Array(props.boardWidth).fill(false)));
        this.revealed = new Array(props.boardHeight).fill(false).map(() => (new Array(props.boardWidth).fill(false)));
        this.boardWidth = props.boardWidth;
        this.boardHeight = props.boardHeight;
        this.numMines = props.numMines;
        this.placeMines();
    }

    printBoard() {
        var text = "";
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                text += this.board[i][j] + "\t";
            }
            text += "\n"
        }
        console.log(text + "\n\n\n\n\n")
    }

    printVisited() {
        var text = "";
        for (let i = 0; i < this.revealed.length; i++) {
            for (let j = 0; j < this.revealed[0].length; j++) {
                text += this.revealed[i][j] + "\t";
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
            if (this.board[randX][randY] != -1) {
                this.board[randX][randY] = -1 // place bomb
                this.calculateNeighbors(randX, randY);
                placedMines++;
            }
        }
    }

    private calculateNeighbors(i, j) {
        const positions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ]

        positions.forEach(([row, col]) =>{
            const newRow = i + row;
            const newCol = j + col;

            if (newRow >= 0 && newRow < this.boardWidth && newCol >= 0 && newCol < this.boardHeight) {
                if (this.board[newRow][newCol] != -1) 
                    this.board[newRow][newCol]++;
            }
        })
    }
}