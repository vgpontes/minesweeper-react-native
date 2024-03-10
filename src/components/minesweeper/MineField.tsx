import { View, StyleSheet, Dimensions } from "react-native"
import { Tile } from "./Tile"

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

export interface MineFieldProps {
    board : number[][],
    boardWidth : number,
    boardHeight : number
}

export function MineField(props: MineFieldProps) {
    
    const tileSize = Math.min(
        Dimensions.get('window').width / props.boardWidth,
        Dimensions.get('window').height / props.boardHeight
    );

    const updateNeighboringTiles = (rowIndex, colIndex) => {

    }
    
    return (
        <View style={styles.container}>
            {
            props.board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((number, colIndex) => (
                        <Tile key={`${rowIndex}${colIndex}`} rowIndex={rowIndex} 
                              colIndex={colIndex} tileSize={tileSize} number={number}
                              updateNeighboringTiles={updateNeighboringTiles}/>
                    ))}
                </View>
                    ))}
        </View>
    )
}