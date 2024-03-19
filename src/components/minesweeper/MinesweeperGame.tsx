import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native"
import { Tile } from "./Tile";
import { Minesweeper, placeMines, revealTile } from "utils/Minesweeper";

export interface MinesweeperGameProps {
    game: Minesweeper
    numMines: number
}

export default function MinesweeperGame(props: MinesweeperGameProps) {
    const [board, setBoard] = useState(props.game.board);
    const boardHeight = board.length;
    const boardWidth = board[0].length;
    const [revealCount, setRevealCount] = useState(0);
    const [firstPress, setFirstPress] = useState(true);

    const tileSize = Math.min(
        Dimensions.get('window').width / boardWidth,
        Dimensions.get('window').height / boardHeight
    );

    const onTilePress = (rowIndex : number, colIndex : number) => {
        var newBoard = [...board];
        if (firstPress) {
            placeMines(newBoard, rowIndex, colIndex, props.numMines);
            setFirstPress(false);
        }
        var countObj = { val: revealCount };
        revealTile(newBoard, rowIndex, colIndex, countObj);

        const newRevealCount = countObj.val;
        setRevealCount(newRevealCount);
        setBoard(newBoard);

        if (newRevealCount == (boardHeight * boardWidth - props.numMines)) {
            //TODO: Win condition
            console.log("You Win")
        }
        if (newBoard[rowIndex][colIndex].bombsNearby == -1) {
            // TODO: Lose condition
            console.log("You Lose")
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
      backgroundColor: "#242423",
      aspectRatio: 1
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
});