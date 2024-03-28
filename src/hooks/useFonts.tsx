import * as Font from 'expo-font'

export default async function useFonts() {
    await Font.loadAsync({
        'Cabin': require('../../fonts/Cabin.ttf'),
        'TitanOne': require('../../fonts/TitanOne-Regular.ttf'),
    });
}