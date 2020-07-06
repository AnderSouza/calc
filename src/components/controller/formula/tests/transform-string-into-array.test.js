import {assert} from "chai";
import {transformStringIntoArray} from "../functions";

describe("transformStringIntoArray function", () => {
    it("Returns array of characters when passed string.", () => {
        const expected = ['b', 'i', 'r', 'd'];
        const actual = transformStringIntoArray("bird");
        assert.sameOrderedMembers(actual, expected);
    });
    it("Returns empty array when passed an empty string.", () => {
        const expected = [];
        const actual = transformStringIntoArray("");
        assert.sameOrderedMembers(actual, expected);
    });
});