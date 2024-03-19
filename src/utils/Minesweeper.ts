export interface MinesweeperProps {
    boardWidth : number,
    boardHeight : number,
}

export interface TileInfo {
    bombsNearby : number,
    isFlagged : boolean,
    isRevealed : boolean
}

interface Coordinate {
    x : number,
    y : number
}

export class Minesweeper {
    readonly board : TileInfo[][];

    constructor(props : MinesweeperProps) {
        this.board = new Array(props.boardWidth).fill(null).map(() => {
            return new Array(props.boardHeight).fill(null).map(() => ({
              bombsNearby: 0,
              isFlagged: false,
              isRevealed: false,
            }));
        });
    }

    printBoard() {
        var text = "";
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                text += this.board[i][j].bombsNearby + "\t";
            }
            text += "\n"
        }
        console.log(text + "\n\n\n\n\n")
    }
}

export function placeMines(board : TileInfo[][], initialX : number, initialY : number, numMines : number) {
    var placedMines = 0;
    var coordinates : Coordinate[] = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (isValidNeighbor(i, j, initialX, initialY)) continue;
            coordinates.push({x: i, y: j}); 
        }
    }

    while (placedMines < numMines) {
        const randomCoordinate = coordinates[Math.floor(Math.random() * coordinates.length)];
        const x = randomCoordinate.x;
        const y = randomCoordinate.y;
        board[x][y].bombsNearby = -1;
        calculateNeighbors(board, x, y);
        const index =  coordinates.indexOf(randomCoordinate);
        coordinates.splice(index, 1);
        placedMines++;
    }
}

function isValidNeighbor(x, y, initialX, initialY) {
    return (x == initialX && y == initialY) || (Math.abs(x - initialX) <= 1 && Math.abs(y - initialY) <= 1);
  }

function calculateNeighbors(board, i, j) {
    const positions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ]

    positions.forEach(([row, col]) =>{
        const newRow = i + row;
        const newCol = j + col;

        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
            if (board[newRow][newCol].bombsNearby != -1) 
                board[newRow][newCol].bombsNearby++;
        }
    })
}

export function revealTile(board : TileInfo[][], i: number, j : number) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j].isRevealed) return;
    board[i][j].isRevealed = true;
    if (board[i][j].bombsNearby === 0) {
        revealTile(board, i + 1, j);
        revealTile(board, i - 1, j);
        revealTile(board, i, j + 1);
        revealTile(board, i, j - 1);
        revealTile(board, i + 1, j - 1);
        revealTile(board, i - 1, j - 1);
        revealTile(board, i + 1, j + 1);
        revealTile(board, i - 1, j + 1);
    }
}