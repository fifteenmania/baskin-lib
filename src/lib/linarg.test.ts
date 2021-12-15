import { expect } from "chai"
import { vecFindMin } from "../lib/linarg"

describe('findMin', () => {
    it('[1, 2] => 1', () => {
        expect(vecFindMin([1, 2])).to.equal(1)
    })
    it('[6, 3, 7] => 3', () => {
        expect(vecFindMin([6, 3, 7])).to.equal(3)
    })
})