import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native"
import { Tile } from "./Tile";
import { Minesweeper} from "utils/Minesweeper";
import { GAME_STATUS } from "./GameStatus";

export interface MinesweeperGameProps {
    game: Minesweeper
}

export default function MinesweeperGame(props: MinesweeperGameProps) {
    const game = props.game;
    const [board, setBoard] = useState(game.board);
    const boardHeight = board.length;
    const boardWidth = board[0].length;
    const [revealCount, setRevealCount] = useState(0);
    const [firstPress, setFirstPress] = useState(true);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.InProgress);

    const tileSize = Math.min(
        Dimensions.get('window').width / boardWidth,
        Dimensions.get('window').height / boardHeight
    );

    const onTilePress = (rowIndex : number, colIndex : number) => {
        if (firstPress) {
            game.placeMines(rowIndex, colIndex);
            setFirstPress(false);
        }
        var newBoard = [...game.board];
        var countObj = { val: revealCount };
        game.revealTile(rowIndex, colIndex, countObj);

        const newRevealCount = countObj.val;
        setRevealCount(newRevealCount);

        if (newRevealCount == (boardHeight * boardWidth - game.getNumMines())) {
            //TODO: Win condition
            console.log("You Win")
            setGameStatus(GAME_STATUS.Win)
        }
        if (newBoard[rowIndex][colIndex].minesNearby == -1) {
            // Reveal all bomb locations
            game.getMineCoordinates().forEach((coordinate) => {
                game.revealTile(coordinate.x, coordinate.y);
            });
            console.log("You Lose")
            setGameStatus(GAME_STATUS.Lose);
        }
        setBoard(newBoard);
    }

    const onTileHold = (rowIndex : number, colIndex : number) => {
        const newBoard = [...board];
        newBoard[rowIndex][colIndex].isFlagged = !newBoard[rowIndex][colIndex].isFlagged
        setBoard(newBoard)
    }

    //handleTileSize();
    
    return (
        <View style={styles.container}>
            {
            board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((tile, colIndex) => (
                        <Tile key={`${rowIndex}${colIndex}`} 
                            rowIndex={rowIndex} 
                            colIndex={colIndex} 
                            tileSize={tileSize} 
                            tileInfo={tile} 
                            onPress={onTilePress}
                            onHold={onTileHold}
                            gameStatus={gameStatus}
                        />
                    ))}
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#242423",
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
});