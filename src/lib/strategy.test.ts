import { expect } from "chai"
import { getChooseProb, getFullLoseProbMat, getLookupMat, getLookupMatRev, getLoseVec } from "./strategy"

describe("getChooseProb", () => {
    it("[1] => [1]", () => {
        expect(getChooseProb([1])).to.deep.equal([1])
    })
    it("[0] => [1]", () => {
        expect(getChooseProb([0])).to.deep.equal([1])
    })
    it("[1, 0] => [0, 1]", () => {
        expect(getChooseProb([1, 0])).to.deep.equal([0, 1])
    })
    it("[1, 0, 0] => [0, 1/2, 1/2]", () => {
        expect(getChooseProb([1, 0, 0])).to.deep.equal([0, 1/2, 1/2])
    })
    it("[1, 0, 0, 0] => [0, 1/3, 1/3, 1/3]", () => {
        expect(getChooseProb([1, 0, 0, 0])).to.deep.equal([0, 1/3, 1/3, 1/3])
    })
})

describe("getLookupMatRev", () => {
    it("", () => {
        expect(getLookupMatRev([[1, 0], [0, 1]], 2, 30, 31)).to.deep.equal([[1, 0]])
    })
    it("", () => {
        expect(getLookupMatRev([[1, 0], [0, 1]], 2, 29, 31)).to.deep.equal([[1, 0], [0, 1]])
    })
    it("", () => {
        expect(getLookupMatRev([[1, 0, 0], [0, 1, 0]], 2, 29, 31)).to.deep.equal([[1, 0, 0], [0, 1, 0]])
    })
})

describe("getLoseVec", () => {
    it("", () => {
        expect(getLoseVec([[1], [0]], 1, 0)).to.deep.equal([0])
    })
    it("", () => {
        expect(getLoseVec([[1, 0], [1, 0]], 1, 0)).to.deep.equal([1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1]], 2, 0)).to.deep.equal([0, 1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1], [1]], 2, 0)).to.deep.equal([0, 1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1], [1]], 3, 0)).to.deep.equal([0, 1, 1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1], [1]], 4, 0)).to.deep.equal([0, 1, 1])
    })
    it("", () => {
        expect(getLoseVec([[1, 0], [0, 1], [0.5, 0.5], [0, 1], [1, 0]], 2, 1)).to.deep.equal([0.5, 0])
    })
    it("", () => {
        expect(getLookupMat([[1, 0, 0, 0]], 2, 0)).to.deep.equal([])
    })
})

describe("getFullLoseProbMat", () => {
    function getMessage(numPlayer: number, maxCount: number, numEnd: number) {
        return `numPlayer: ${numPlayer}, maxCount: ${maxCount}, numEnd: ${numEnd}`
    }
    it(getMessage(2, 2, 1), () => {
        expect(getFullLoseProbMat(2, 2, 1)).to.deep.equal([[1, 0], [0, 1]].reverse())
    })
    it(getMessage(2, 3, 4), () => {
        const result = getFullLoseProbMat(2, 3, 4)
        expect(result.length).to.deep.equal(5)
        expect(result).to.deep.equal([[1, 0], [0, 1], [1, 0], [1, 0], [1, 0]].reverse())
    })
    it(getMessage(2, 2, 4), () => {
        expect(getFullLoseProbMat(2, 2, 4)).to.deep.equal([[1, 0], [0, 1], [1, 0], [1, 0], [0, 1]].reverse())
    })
    it(getMessage(2, 2, 6), () => {
        expect(getFullLoseProbMat(2, 2, 6)).to.deep.equal([[1, 0], [0, 1], [1, 0], [1, 0], [0, 1], [1, 0], [1, 0]].reverse())
    })
    it(getMessage(3, 2, 3), () => {
        expect(getFullLoseProbMat(3, 2, 3)).to.deep.equal([[1, 0, 0], [0, 1, 0], [0, 0, 1], [1/2, 0, 1/2]].reverse())
    })
    it(getMessage(3, 3, 4), () => {
        expect(getFullLoseProbMat(3, 3, 4)).to.deep.equal([[1, 0, 0], [0, 1, 0], [0, 0, 1], [1/2, 0, 1/2], [1/2, 0, 1/2]].reverse())
    })
})
