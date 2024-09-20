const mergePatch = require('../mergePatch');

describe('mergePatch function', () => {
    test('should merge two simple JSON objects', () => {
        const target = { "a": "b" };
        const patch = { "b": "c" };
        const expected = { "a": "b", "b": "c" };

        expect(mergePatch(target, patch)).toEqual(expected);
    });

    test('should delete property when value is null in the patch', () => {
        const target = { "a": "b", "b": "c" };
        const patch = { "b": null };
        const expected = { "a": "b" };

        expect(mergePatch(target, patch)).toEqual(expected);
    });

    test('should replace arrays entirely', () => {
        const target = { "a": [1, 2, 3] };
        const patch = { "a": [4, 5, 6] };
        const expected = { "a": [4, 5, 6] };

        expect(mergePatch(target, patch)).toEqual(expected);
    });

    test('should merge nested objects', () => {
        const target = { "a": { "b": "c" } };
        const patch = { "a": { "d": "e" } };
        const expected = { "a": { "b": "c", "d": "e" } };

        expect(mergePatch(target, patch)).toEqual(expected);
    });

    test('should handle primitive values in patch', () => {
        const target = { "a": "b" };
        const patch = { "a": "new_value" };
        const expected = { "a": "new_value" };

        expect(mergePatch(target, patch)).toEqual(expected);
    });
});
