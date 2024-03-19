import { Text, Pressable, StyleSheet } from "react-native";

export interface TileProps {
    tileSize: number
    rowIndex: number
    colIndex: number
    number: number
    isRevealed: boolean
    isFlag: boolean
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
    const handlePress = () => {
        if (props.isFlag) {
            return;
        }
        console.log('Pressed', props.rowIndex, props.colIndex);
        props.onPress(props.rowIndex, props.colIndex);
    };
    
    const handleHold = () => {
        console.log('Held', props.rowIndex, props.colIndex);
        props.onHold(props.rowIndex, props.colIndex);
    };

    const bgColor = props.isRevealed ? '#EFD8A3' : '#8FE186'
    
    return (
        <Pressable
            onPress={handlePress}
            onLongPress={handleHold}
            disabled={props.isRevealed}
            hitSlop={{top: 10}}
            style={({pressed}) => [
                styles.square, 
                    {
                        height: props.tileSize - 5, 
                        width: props.tileSize - 5,
                        backgroundColor: pressed ? '#62B958': bgColor 
                    }]
                }>
            {props.isRevealed ? <Text>{props.number}</Text> : props.isFlag ? <Text>FLAG</Text> : null}
        </Pressable>
    )
}