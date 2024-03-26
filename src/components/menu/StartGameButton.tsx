import { Pressable, View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    square: {
      borderRadius: 5,
      margin: 1,
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: "none"
    },
});

export interface StartGameButtonProps {
    onPress : () => void;
}

export function StartGameButton(props : StartGameButtonProps) {

    const onPress = () => {
        props.onPress();
    }

    return (
        <View>
           <Pressable style={styles.square} onPress={onPress}>
                <Text>
                    Play Again?
                </Text>
           </Pressable>
        </View>
    )
}