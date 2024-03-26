import { View, Pressable, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({ 
    centered: { 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "white",
    }
});

export function HomeScreen({navigation}) {
    return (
        <View style={styles.centered}>
            <Pressable onPress={() => navigation.navigate('GameScreen')}>
                <Text>Play Minesweeper</Text>
            </Pressable>
        </View>
    )
}