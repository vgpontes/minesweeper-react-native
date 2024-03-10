import { StyleSheet, Text, View } from 'react-native';
import { Minesweeper } from './src/Minesweeper'

export default function App() {
   
  return (
    <View style={styles.container}>
      <Text>"Hello World"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
