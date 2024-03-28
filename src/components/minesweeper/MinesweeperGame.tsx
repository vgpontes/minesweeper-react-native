import { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native"
import { Tile } from "./Tile";
import { Minesweeper} from "utils/Minesweeper";
import { GAME_STATUS } from "./GameStatus";
import { FlagBox } from "./FlagBox";
import { Button } from "components/menu/Button";

export interface MinesweeperGameProps {
    game: Minesweeper
}

export default function MinesweeperGame(props: MinesweeperGameProps) {
    const [game, setGame] = useState(props.game);
    const [board, setBoard] = useState(game.board);
    const boardHeight = board.length;
    const boardWidth = board[0].length;
    const [revealCount, setRevealCount] = useState(0);
    const [firstPress, setFirstPress] = useState(true);
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.InProgress);
    const [numFlagsPlaced, setNumFlagsPlaced] = useState(0)

    const numFlags = game.getNumMines();

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
        const tileIsFlagged = newBoard[rowIndex][colIndex].isFlagged
        newBoard[rowIndex][colIndex].isFlagged = !tileIsFlagged
        const newFlagsPlaced = tileIsFlagged ? numFlagsPlaced - 1 : numFlagsPlaced + 1;
        setNumFlagsPlaced(newFlagsPlaced);
        setBoard(newBoard)
    }

    const resetGame = () => {
        const newGame = new Minesweeper({boardHeight: boardHeight, boardWidth: boardWidth, numMines: numFlags});
        setGame(newGame);
        setBoard(newGame.board);
        setRevealCount(0);
        setFirstPress(true);
        setGameStatus(GAME_STATUS.InProgress);
        setNumFlagsPlaced(0);
    }
    
    return (
        <View style={styles.container}>
            <FlagBox numFlags={numFlags - numFlagsPlaced}/>
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
            <Button disabled={gameStatus == GAME_STATUS.InProgress} style={{marginTop: 25, opacity: gameStatus == GAME_STATUS.InProgress ? 0 : 100}} onPress={resetGame}>
                Play Again
            </Button>
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