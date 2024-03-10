import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native"
import { Tile } from "./Tile";
import { Minesweeper } from "utils/Minesweeper";

export interface MinesweeperGameProps {
    game: Minesweeper
}

export default function MinesweeperGame(props: MinesweeperGameProps) {
    const mineField = props.game.board;

    const tileSize = Math.min(
        Dimensions.get('window').width / props.game.boardWidth,
        Dimensions.get('window').height / props.game.boardHeight
    );

    handleTileSize();

    return (
        <View style={styles.container}>
            {mineField.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((number, colIndex) => (
                        <Tile key={`${rowIndex}${colIndex}`} tileSize={tileSize} number={number}/>
                    ))}
                </View>
            ))}
        </View>
    );
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
    square: {
      borderRadius: 5,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: "none"
    },
});