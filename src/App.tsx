import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo'
import MinesweeperGame from 'components/minesweeper/Minesweeper';

export default function App() {
  return (
    <View style={styles.container}>
      <MinesweeperGame boardHeight={9} boardWidth={9} numMines={10}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //hello babie
    alignItems: 'center',
    justifyContent: 'center',
  },
});

registerRootComponent(App);