import { expect } from "chai"
import { getUnitVec, vecCumSum, vecFindMin, vecMatDot, vecShiftToLast } from "./linarg"

describe('findMin', () => {
    it('[1, 2] => 1', () => {
        expect(vecFindMin([1, 2])).to.equal(1)
    })
    it('[6, 3, 7] => 3', () => {
        expect(vecFindMin([6, 3, 7])).to.equal(3)
    })
})

describe('vecShiftToLast', () => {
    it('[] => []', () => {
        expect(vecShiftToLast([])).to.deep.equal([])
    })
    it('[1] => [1]', () => {
        expect(vecShiftToLast([1])).to.deep.equal([1])
    })
    it('[1, 2] => [2, 1]', () => {
        expect(vecShiftToLast([1, 2])).to.deep.equal([2, 1])
    })
    it('[1, 2, 3] => [3, 1, 2]', () => {
        expect(vecShiftToLast([1, 2, 3])).to.deep.equal([3, 1, 2])
    })
    it('immutability', () => {
        const vec = [1, 2, 3, 4];
        const vecCpy = vec.slice();
        vecShiftToLast(vec);
        expect(vec).to.deep.equal(vecCpy);
    })
})

describe('vecCumSum', () => {
    it("", () => {
        expect(vecCumSum([0, 1, 2, 3])).to.deep.equal([0, 1, 3, 6])
    })
    it("", () => {
        expect(vecCumSum([1, 2, 3, 4])).to.deep.equal([1, 3, 6, 10])
    })
    it("", () => {
        expect(vecCumSum([])).to.deep.equal([])
    })
    it("", () => {
        expect(vecCumSum([3, -1 , -1])).to.deep.equal([3, 2, 1])
    })
})


describe("vecMatDot", () => {
    it("[1, 0], [[1, 2, 3], [4, 5, 6]] => [1, 2, 3]", () => {
        expect(vecMatDot([1, 0], [[1, 2, 3], [4, 5, 6]])).to.deep.equal([1, 2, 3])
    })
})

describe("getUnitVec", () => {
    it("", () => {
        expect(getUnitVec(1)).to.deep.equal([1])
    })
    it("", () => {
        expect(getUnitVec(2)).to.deep.equal([1, 0])
    })
    it("", () => {
        expect(getUnitVec(3)).to.deep.equal([1, 0, 0])
    })
})