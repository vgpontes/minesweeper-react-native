import { registerRootComponent } from 'expo'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from 'components/menu/HomeScreen';
import { GameScreen } from 'components/menu/GameScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="GameScreen" component={GameScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);