import { View, StyleSheet } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { GAME_STATUS } from "./GameStatus";

const styles = StyleSheet.create({
    box: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: "none",
        backgroundColor: "lightgrey",
        marginBottom: 10,
        padding: 10
    },
    smiley: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: "none",
        backgroundColor: "yellow",
    }
});
export function Smiley(props) {
    const smileyFace = () => {
        if (props.gameStatus == GAME_STATUS.Win) {
            return "face-laugh-beam";
        } else if (props.gameStatus == GAME_STATUS.Lose) {
            return "face-dizzy";
        } else {
            return props.name
        }
    }
    return (
        <View style={styles.box}>
            <View style={styles.smiley}>
                <FontAwesome6 name={smileyFace()} size={30} color="black" />
            </View>
        </View>
        
    );
}