import { View, Text, StyleSheet } from "react-native";
import { Color } from "./GameStatus";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";

const styles = StyleSheet.create({
    box: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: "none",
        backgroundColor: Color.grassColor,
        padding: 20,
        paddingHorizontal: 30,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10
    }
});

export interface FlagBoxProps {
    numFlags: number
}

export function FlagBox(props : FlagBoxProps) {
    const [flagsPlaced, setFlagsPlaced] = useState();
    return (
        <View style={styles.box}>
            <MaterialCommunityIcons name="flag-variant" size={24} color="red"/>
            <Text>{props.numFlags}</Text>
        </View>
    )
}