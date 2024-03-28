import useFonts from "hooks/useFonts";
import { useCallback, useEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native"
import * as SplashScreen from 'expo-splash-screen'
import { Button } from "./Button";
import { Color } from "components/minesweeper/GameStatus";

const styles = StyleSheet.create({ 
    centered: { 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: Color.tilePressColor,
    },
    titleView: { 
        justifyContent: "center", 
        alignItems: "center", 
        marginBottom: 50
    },
    title: {
        fontFamily: "TitanOne",
        color: "white",
        userSelect: "none",
        fontSize: 40
    },
    subtitle: {
        fontFamily: "TitanOne",
        color: "white",
        userSelect: "none",
        fontSize: 15
    }
});

export function HomeScreen({navigation}) {
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                await useFonts();
            } catch (e) {
                console.warn(e);
            } finally {
            setAppIsReady(true);
          }
        }
        prepare();
    });
    
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }
    return (
        <View style={styles.centered} onLayout={onLayoutRootView}>
            <View style={styles.titleView}>
                <Text style={styles.title}>
                    Minesweeper
                </Text>
                <Text style={styles.subtitle}>
                    by Victor Pontes
                </Text>
            </View>
            <Button onPress={() => navigation.navigate('GameScreen')}>Start Game</Button>
        </View>
    )
}