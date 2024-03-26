import { Pressable, Text } from "react-native"
import { Minesweeper } from "utils/Minesweeper";
import { useEffect, useState } from "react";
import MinesweeperGame from "components/minesweeper/MinesweeperGame";

export function GameScreen({navigation}) {
    const game = new Minesweeper({
        boardWidth: 9,
        boardHeight: 9,
        numMines: 10
    })
    return (
        <MinesweeperGame game={game}/>
    )
}