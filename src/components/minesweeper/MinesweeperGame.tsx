import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native"
import { Tile } from "./Tile";
import { Minesweeper } from "utils/Minesweeper";

export interface MinesweeperGameProps {
    game: Minesweeper
}

export default function MinesweeperGame(props: MinesweeperGameProps) {
    const [board, setBoard] = useState(props.game.board);
    const [revealed, setRevealed] = useState(props.game.revealed);
    const [flags, setFlags] = useState(props.game.flags);

    const tileSize = Math.min(
        Dimensions.get('window').width / props.game.boardWidth,
        Dimensions.get('window').height / props.game.boardHeight
    );

    const onTilePress = (rowIndex : number, colIndex : number) => {
        const newBoard = [...board];
        const newRevealed = [...revealed];
        revealZeroes(newBoard, newRevealed, rowIndex, colIndex);
        setBoard(newBoard);
        setRevealed(newRevealed)
    }

    const onTileHold = (rowIndex : number, colIndex : number) => {
        const newFlags = [...flags];
        newFlags[rowIndex][colIndex] = !newFlags[rowIndex][colIndex]
        setFlags(newFlags)
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
                            number={tile} 
                            isRevealed={revealed[rowIndex][colIndex]} 
                            onPress={onTilePress}
                            onHold={onTileHold}
                            isFlag={flags[rowIndex][colIndex]}
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

function revealZeroes(board : number[][], revealed : boolean[][], i: number, j : number) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || revealed[i][j]) return;
    // set reveal
    revealed[i][j] = true;
    if (board[i][j] === 0) {
        revealZeroes(board, revealed, i + 1, j);
        revealZeroes(board, revealed, i - 1, j);
        revealZeroes(board, revealed, i, j + 1);
        revealZeroes(board, revealed, i, j - 1);
        revealZeroes(board, revealed, i + 1, j - 1);
        revealZeroes(board, revealed, i - 1, j - 1);
        revealZeroes(board, revealed, i + 1, j + 1);
        revealZeroes(board, revealed, i - 1, j + 1);
    }
}