import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native"
import { Tile } from "./Tile";
import { Minesweeper, TileInfo } from "utils/Minesweeper";

export interface MinesweeperGameProps {
    game: Minesweeper
}

export default function MinesweeperGame(props: MinesweeperGameProps) {
    const [board, setBoard] = useState(props.game.board);
    const tilesLeft = board.length * board[0].length;

    const tileSize = Math.min(
        Dimensions.get('window').width / props.game.boardWidth,
        Dimensions.get('window').height / props.game.boardHeight
    );

    const onTilePress = (rowIndex : number, colIndex : number) => {
        const newBoard = [...board];
        revealTile(newBoard, rowIndex, colIndex);
        setBoard(newBoard);
        if (tilesLeft == props.game.numMines) {
            // TODO: GAME WIN
        }
    }

    const onTileHold = (rowIndex : number, colIndex : number) => {
        const newBoard = [...board];
        newBoard[rowIndex][colIndex].isFlagged = !newBoard[rowIndex][colIndex].isFlagged
        setBoard(newBoard)
    }

    handleTileSize();
    
    return (
        <View style={styles.container}>
            {
            board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((tile, colIndex) => (
                        <Tile key={`${rowIndex}${colIndex}`} 
                            rowIndex={rowIndex} 
                            colIndex={colIndex} 
                            tileSize={tileSize} 
                            tileInfo={tile} 
                            onPress={onTilePress}
                            onHold={onTileHold}
                        />
                    ))}
                </View>
            ))}
        </View>
    )
}

function handleTileSize() {
    const [squareSize, setSquareSize] = useState(0);

    useEffect(() => {
        const updateSquareSize = () => {
        const { width } = Dimensions.get('window');
        setSquareSize(width); // Adjust the factor to your preference
    };

    updateSquareSize();

    const handleResize = () => {
        updateSquareSize();
    };

    Dimensions.addEventListener('change', handleResize);
  }, []);
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
});

function revealTile(board : TileInfo[][], i: number, j : number) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j].isRevealed) return;
    // set reveal
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