import {assert} from "chai";
import {numericStringIsEmpty} from "../../functions";

describe("numericStringIsEmpty function", () => {
    it("Returns false when passed '150'.", () => {
        const expected = false;
        const actual = numericStringIsEmpty("150");
        assert.equal(actual, expected);
    });
    it("Returns true when passed an empty string.", () => {
        const expected = true;
        const actual = numericStringIsEmpty("");
        assert.equal(actual, expected);
    });
});