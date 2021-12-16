import { expect } from "chai"
import { getRandomInt, getRandomIntAsVec } from "./randUtil"

describe("getRandomInt", () => {
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(0, 1);
            expect(value).to.equal(0);
        })
    })
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(0, 2);
            expect(value).to.be.lessThan(2);
            expect(value).to.be.greaterThanOrEqual(0);
        })
    })
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(100, 101);
            expect(value).to.equal(100);
        })
    })
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(100, 102);
            expect(value).to.be.lessThan(102);
            expect(value).to.be.greaterThanOrEqual(100);
        })
    })
    it("Mean value test - can fail occationally", () => {
        const sum = Array.from(Array(1000)).reduce((accum, cur) => accum + getRandomInt(0, 2), 0)/1000;
        expect(sum).to.be.greaterThan(0.4);
        expect(sum).to.be.lessThan(0.6);
    })
})

describe("getRandomIntAsVec", () => {
    it("", () => {
        Array.from(Array(10)).forEach(() => expect(getRandomIntAsVec([1, 0])).to.equal(0));
    })
    it("", () => {
        Array.from(Array(10)).forEach(() => expect(getRandomIntAsVec([0, 1])).to.equal(1));
    })
    it("", () => {
        Array.from(Array(10)).forEach(() => expect(getRandomIntAsVec([0, 0, 1, 0])).to.equal(2));
    })
    it("Mean value test - can fail occationally", () => {
        const chooseVec = [0.5, 0.5]
        const sum = Array.from(Array(5000)).reduce((accum, _) => accum + getRandomIntAsVec(chooseVec), 0)/5000;
        expect(sum).to.be.greaterThan(0.4)
        expect(sum).to.be.lessThan(0.6)
    })
})