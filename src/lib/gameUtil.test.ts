import { expect } from "chai";
import { getCurrentPlayer, getCurrentNum, handlePlayerTurn, handleAiTurns, PlayLog, getLastPlayer, gameIsEnd } from "./gameUtil";
import { getRandomInt } from "./randUtil";
import { getFullLoseProbMat } from "./strategy";

/**
 * 
 * @param numPlayer number of players
 * @param maxCall maximum number of numbers can call in one turn
 * @param numTurns number of turns played so far
 * @returns random PlayLog in condition.
 */
function makeRandomTestPlayLog(numPlayer: number, maxCall: number, numTurns: number) : PlayLog {
    const ret : PlayLog = [{player: 1, lastCall: getRandomInt(1, maxCall)}];
    for(let i = 1; i < numTurns; i++) {
        ret.push({player: i%numPlayer + 1, lastCall: ret[i-1].lastCall + getRandomInt(1, maxCall)});
    }
    return ret;
}

describe('getCurrentPlayer', () => {
    it('(staticTestPlayLog, 3) => 1', () => {
        const testPlayLog : PlayLog = [
            {player: 0, lastCall: 1}, 
            {player: 1, lastCall: 2},
            {player: 2, lastCall: 3},
            {player: 0, lastCall: 5},
        ]
        expect(getCurrentPlayer(testPlayLog, 3)).to.equal(1);
    })
    it('(makeRandomTestPlayLog(3, 3, 6), 3) => 1', () => {
        const testPlayLog = makeRandomTestPlayLog(3, 3, 6);
        console.log(testPlayLog);
        expect(getCurrentPlayer(testPlayLog, 3)).to.equal(1);
    })
    it('(makeRandomTestPlayLog(4, 4, 1), 4) => 2', () => {
        const testPlayLog = makeRandomTestPlayLog(4, 4, 1);
        console.log(testPlayLog);
        expect(getCurrentPlayer(testPlayLog, 4)).to.equal(2);
    })    
})

describe("getLastPlayer", () => {
    it("empty array undefined", () => { 
        expect(getLastPlayer([])).to.equal(undefined)
    })
    it("", () => {
        const testPlayLog: PlayLog = [
            {player: 0, lastCall: 1}
        ]
        expect(getLastPlayer(testPlayLog)).to.equal(0)
    })
})

describe("gameIsEnd", () => {
    it("end number 0", () => {
        expect(gameIsEnd([], 0)).to.equal(true)
    })
    it("", () => {
        const testLog: PlayLog = [
            {player: 0, lastCall: 1},
            {player: 1, lastCall: 4}
        ]
        expect(gameIsEnd(testLog, 4)).to.equal(true)
    })
    it("", () => {
        const testLog: PlayLog = [
            {player:0, lastCall:1},
            {player:1, lastCall:5}
        ]
        expect(gameIsEnd(testLog, 4)).to.equal(false)
    })
})

describe('getCurrentNum', () => {
    it('staticTestPlayLog', () => {
        const testPlayLog : PlayLog = [
            {player: 0, lastCall: 1}, 
            {player: 1, lastCall: 2},
            {player: 2, lastCall: 3},
            {player: 0, lastCall: 9},
        ]
        expect(getCurrentNum(testPlayLog)).to.equal(9);
    })
    it('(makeRandomTestPlayLog(4, 4, 1))', () => {
        const testPlayLog = makeRandomTestPlayLog(4, 4, 1);
        console.log(testPlayLog);
        expect(getCurrentNum(testPlayLog)).to.deep.equal(testPlayLog[testPlayLog.length - 1].lastCall);
    })
})

describe('handlePlayerTurn', () => {
    it('(makeRandomTestPlayLog(4, 4, 1), 3, 31, 1) => newPlayLog', () => {
        const testPlayLog = makeRandomTestPlayLog(4, 4, 1);
        const answer = testPlayLog.concat({player: 1, lastCall: testPlayLog[testPlayLog.length - 1].lastCall + 3});
        expect(handlePlayerTurn(testPlayLog, 3, 31, 1)).to.deep.equal(answer);
    })
})

describe('handleAiTurns', () => {
    /** 
    it('(getFullLoseProbMat(2, 3, 31), makeRandomTestPlayLog(2, 3, 1), 3, 31, 1) => newPlayLog', () => {
        const testLoseMat = getFullLoseProbMat(2, 3, 31);
        const testPlayLog = makeRandomTestPlayLog(2, 3, 1);
        const answer : PlayLog = [];
        expect(handleAiTurns(testLoseMat, testPlayLog, 3, 31, 1)).to.deep.equal(answer);
    })*/
    it('(getFullLoseProbMat(3, 3, 31), makeRandomTestPlayLog(2, 3, 1), 3, 31, 1) => newPlayLog', () => {
        const testPlayLog : PlayLog = [
            {player: 0, lastCall: 1}, 
            {player: 1, lastCall: 2},
            {player: 2, lastCall: 3},
            {player: 0, lastCall: 5},
            {player: 1, lastCall: 30},
        ]
        const testLoseMat = getFullLoseProbMat(3, 3, 31);
        console.log(testPlayLog);
        const answer : PlayLog = testPlayLog.concat({player: 2, lastCall: 31});
        expect(handleAiTurns(testLoseMat, testPlayLog, 3, 31, 0)).to.deep.equal(answer);
    })
})