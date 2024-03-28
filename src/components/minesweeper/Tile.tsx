import { Text, Pressable, StyleSheet } from "react-native";
import { TileInfo } from "utils/Minesweeper";
import { GAME_STATUS, Color } from "./GameStatus";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface TileProps {
    tileSize: number
    rowIndex: number
    colIndex: number
    tileInfo: TileInfo
    onPress: (rowIndex, colIndex) => void;
    onHold: (rowIndex, colIndex) => void;
    gameStatus: GAME_STATUS;
}

const styles = StyleSheet.create({
    square: {
      margin: 1,
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
            return <MaterialCommunityIcons name="flag-variant" color="red" size={24}/>
            //return "\u{1F6A9}";
        }
        if (!isRevealed) {
            return null;
        }
        if (isMine) {
            return <MaterialCommunityIcons name="bomb" size={24} color="black" />
            //return "\u{1F4A3}";
        }
        const fontColor = { 1: "blue", 2: "green", 3: "red", 4: "purple"}
        return minesNearby ? <Text style={{fontFamily:"Cabin", fontSize:24, color: fontColor[minesNearby]}}>{minesNearby}</Text> : null//minesNearby ? minesNearby : "";
    }

    const bgColorPicker = () => {
        if (!isRevealed) {
            return Color.grassColor;
        }
        if (isMine) {
            return Color.bombTileColor;
        }
        return Color.dirtColor
    }


    const bgColor = bgColorPicker();
    
    return (
        <Pressable
            onPress={handlePress}
            onLongPress={handleHold}
            disabled={isRevealed || props.gameStatus == GAME_STATUS.Win || props.gameStatus == GAME_STATUS.Lose}
            hitSlop={{top: 10}}
            style={({pressed}) => [
                styles.square, 
                    {
                        height: props.tileSize - 5, 
                        width: props.tileSize - 5,
                        backgroundColor: pressed ? Color.tilePressColor : bgColor 
                    }]
                }>
            {tileText()}
        </Pressable>
    )
}