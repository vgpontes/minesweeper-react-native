import { Text, Pressable, StyleSheet } from "react-native";
import { TileInfo } from "utils/Minesweeper";

export interface TileProps {
    tileSize: number
    rowIndex: number
    colIndex: number
    tileInfo: TileInfo
    onPress: (rowIndex, colIndex) => void;
    onHold: (rowIndex, colIndex) => void;
    lostGame: boolean;
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
    const {minesNearby, isFlagged, isRevealed, isMine} = props.tileInfo;
    const handlePress = () => {
        if (isFlagged) {
            return;
        }
        props.onPress(props.rowIndex, props.colIndex);
    };
    
    const handleHold = () => {
        props.onHold(props.rowIndex, props.colIndex);
    };

    const tileText = () => {
        if (isFlagged) {
            return "\u{1F6A9}";
        }
        if (!isRevealed) {
            return "";
        }
        if (isMine) {
            return "\u{1F4A3}";
        }
        return minesNearby ? minesNearby : "";
    }

    const bgColorPicker = () => {
        if (!isRevealed) {
            return '#8FE186';
        }
        if (isMine) {
            return '#D33F49';
        }
        return '#EFD8A3'
    }


    const bgColor = bgColorPicker();
    
    return (
        <Pressable
            onPress={handlePress}
            onLongPress={handleHold}
            disabled={isRevealed || props.lostGame}
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