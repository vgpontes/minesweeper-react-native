import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native"

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
                text += this.board[i][j] + "\t";
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
    const mineField = game.board;
    game.printBoard()

    const tileSize = Math.min(
        Dimensions.get('window').width / game.boardWidth,
        Dimensions.get('window').height / game.boardHeight
    );

    return (
        <View style={styles.container}>
            {mineField.map((row, rowIndex) => (
                <View style={styles.row}>
                    {row.map((number, colIndex) => (
                        <Pressable 
                            style={[styles.square, {height: tileSize - 5, width: tileSize - 5}]}>
                                <Text key={`${rowIndex}${colIndex}`}>{number}</Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: "auto",
      backgroundColor: "green",
      aspectRatio: 1
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    square: {
      backgroundColor: '#8FE186',
      borderRadius: 5,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
});