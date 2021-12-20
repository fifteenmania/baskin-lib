import { getRandomIntAsVec } from "./randUtil";
import { getChooseProb, getLoseVec } from "./strategy";

export interface PlayLogEntry {
    player: number,
    lastCall: number
}

export type PlayLog = PlayLogEntry[]

/**
 * 
 * @param playLog Current game play log.
 * @param numPlayer Number of players.
 * @returns Current player who need to call next number.
 */
export function getCurrentPlayer(playLog: PlayLog, numPlayer: number): number {
    if (playLog.length === 0) {
        return 0;
    }
    return (playLog[playLog.length - 1].player + 1)%numPlayer;
}

/**
 * 
 * @param playLog Current game play log.
 * @returns Last player who called number. Return `undefined` if playLog is empty.
 */
export function getLastPlayer(playLog: PlayLog): number|undefined {
    if (playLog.length === 0) {
        return undefined;
    }
    return (playLog[playLog.length - 1].player);
}

/**
 * 
 * @param playLog Current game play log
 * @returns Recently called number.
 */
export function getCurrentNum(playLog: PlayLog): number {
    if (playLog.length === 0) {
        return 0;
    }
    return playLog[playLog.length - 1].lastCall;
}

/**
 * 
 * @param newNum Called number without regarding ending number
 * @param numEnd The last number of the game
 * @param playerTurn Player number on this turn
 * @returns New PlayLogEntry after call
 */
export function makePlayLogEntry(newNum: number, numEnd: number, playerTurn: number): PlayLogEntry {
    if (newNum >= numEnd) {
        return {player: playerTurn, lastCall: numEnd}
    } else {
        return {player: playerTurn, lastCall: newNum}
    }
}

/**
 * 
 * @param loseMat Lose matrix
 * @param playLog Current game play log
 * @param maxCall Maximum number of call in once
 * @param numEnd The last number of the game
 * @param aiTurn Player number of AI playing this turn
 * @returns Updated playLog after one AI turn
 */
export function handleAiTurnOnce(loseMat: number[][], playLog: PlayLog, maxCall: number, numEnd: number, aiTurn: number): PlayLogEntry {
    const currentNum = getCurrentNum(playLog);
    const loseVec = getLoseVec(loseMat, maxCall, currentNum);
    const chooseProb = getChooseProb(loseVec);
    const numChoose = getRandomIntAsVec(chooseProb);
    const newNum = numChoose + currentNum + 1;
    return makePlayLogEntry(newNum, numEnd, aiTurn);
}

/**
 * 
 * @param playLog Current game play log
 * @param numChoose Human chose to call numbers up to `numChoose`
 * @param numEnd The last number of the game
 * @param playerTurn Human player turn
 * @returns Updated playlog after human play. Doesn't mutate original playLog.
 */
export function handlePlayerTurn(playLog: PlayLog, numChoose: number, numEnd: number, playerTurn: number): PlayLog {
    const playLogCopy = playLog.slice();
    const currentNum = getCurrentNum(playLog);
    const newNum = numChoose + currentNum;
    const newEntry = makePlayLogEntry(newNum, numEnd, playerTurn);
    playLogCopy.push(newEntry);
    return playLogCopy;
}

/**
 * 
 * @param loseMat Lose rate matrix for all game states
 * @param playLog Current game play log
 * @param maxCall Maximum number of call in once
 * @param numEnd The last number of the game
 * @param playerTurn Human player turn
 * @returns Updated playlog after ai play. Doesn't mutate original `playLog`
 */
export function handleAiTurns(loseMat: number[][], playLog: PlayLog, maxCall: number, numEnd: number, playerTurn: number): PlayLog {
    const playLogCopy = playLog.slice();
    while (true) {
        const currentNum = getCurrentNum(playLogCopy);
        if (currentNum >= numEnd) {
            return playLogCopy;
        }
        const numPlayer = loseMat[0].length;
        const currentPlayer = getCurrentPlayer(playLogCopy, numPlayer);
        if (currentPlayer == playerTurn) {
            return playLogCopy;
        }
        const newEntry = handleAiTurnOnce(loseMat, playLogCopy, maxCall, numEnd, currentPlayer);
        playLogCopy.push(newEntry);
    }
}
