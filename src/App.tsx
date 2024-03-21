import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo'
import MinesweeperGame from 'components/minesweeper/MinesweeperGame';
import { Minesweeper } from 'utils/Minesweeper';

export default function App() {
  const minesweeperGame = new Minesweeper({
    boardHeight: 9,
    boardWidth: 9,
    numMines: 10
  });

  return (
    <View style={styles.container}>
      <MinesweeperGame game={minesweeperGame}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

registerRootComponent(App);