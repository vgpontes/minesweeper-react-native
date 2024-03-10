import { useState } from "react";
import { Text, Pressable, StyleSheet } from "react-native";

export interface TileProps {
    id? : string
    tileSize: number
    number: number
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
    const [pressed, setPressed] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#8FE186');

    const handlePress = () => {
        console.log('Pressed', props.id);
          
        setPressed(true);
        setBackgroundColor('#EFD8A3')
    };
    
    return (
        <Pressable
            onPress={handlePress}
            disabled={pressed}
            hitSlop={{top: 10}}
            style={({pressed}) => [
                styles.square, 
                    {
                        height: props.tileSize - 5, 
                        width: props.tileSize - 5,
                        backgroundColor: pressed ? '#62B958' : backgroundColor
                    }]
                }>
            <Text>{props.number}</Text>
        </Pressable>
    )
}