import { Text, Pressable, StyleSheet } from "react-native";
import { TileInfo } from "utils/Minesweeper";

export interface TileProps {
    tileSize: number
    rowIndex: number
    colIndex: number
    tileInfo: TileInfo
    onPress: (rowIndex, colIndex) => void;
    onHold: (rowIndex, colIndex) => void;
}

const styles = StyleSheet.create({
    square: {
      borderRadius: 5,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: "none"
    },
});

export function Tile(props : TileProps) {
    const {bombsNearby, isFlagged, isRevealed, isBomb} = props.tileInfo;
    const handlePress = () => {
        if (isFlagged) {
            return;
        }
        console.log('Pressed', props.rowIndex, props.colIndex);
        props.onPress(props.rowIndex, props.colIndex);
    };
    
    const handleHold = () => {
        console.log('Held', props.rowIndex, props.colIndex);
        props.onHold(props.rowIndex, props.colIndex);
    };

    const tileText = () => {
        if (isFlagged) {
            return "\u{1F6A9}";
        }
        if (!isRevealed) {
            return "";
        }
        if (isBomb) {
            return "\u{1F4A3}";
        }
        return bombsNearby ? bombsNearby : "";
    }

    //#F06449

    const bgColorPicker = () => {
        if (!isRevealed) {
            return '#8FE186';
        }
        if (isBomb) {
            return '#D33F49';
        }
        return '#EFD8A3'
    }


    const bgColor = bgColorPicker();
    
    return (
        <Pressable
            onPress={handlePress}
            onLongPress={handleHold}
            disabled={isRevealed}
            hitSlop={{top: 10}}
            style={({pressed}) => [
                styles.square, 
                    {
                        height: props.tileSize - 5, 
                        width: props.tileSize - 5,
                        backgroundColor: pressed ? '#62B958': bgColor 
                    }]
                }>
            <Text>{tileText()}</Text>
        </Pressable>
    )
}