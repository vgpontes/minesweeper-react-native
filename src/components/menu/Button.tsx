import { Pressable, View, Text, StyleSheet } from "react-native"
import { Color } from "components/minesweeper/GameStatus";

const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: "none",
        backgroundColor: Color.grassColor,
        padding: 20,
        width: 125,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 25,
        marginBottom: 10,
    }
});

export function Button(props) {

    return (
        <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
            <Text style={{fontFamily: "Cabin"}}>
                {props.children}
            </Text>
        </Pressable>
    )
}