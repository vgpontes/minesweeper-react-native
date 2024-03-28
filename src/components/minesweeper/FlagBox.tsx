import { View, Text, StyleSheet } from "react-native";
import { Color } from "./GameStatus";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    box: {
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

export interface FlagBoxProps {
    numFlags: number
}

export function FlagBox(props : FlagBoxProps) {
    return (
        <View style={styles.box}>
            <MaterialCommunityIcons name="flag-variant" size={24} color="red"/>
            <Text style={{fontFamily: "Cabin"}}>{props.numFlags}</Text>
        </View>
    )
}