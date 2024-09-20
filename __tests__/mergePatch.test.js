const mergePatch = require('../mergePatch');

describe('mergePatch function', () => {
  const mergePatch = require('../mergePatch');

   test('Merge {"a":"b"} with {"a":"c"} should result in {"a":"c"}', () => {
        const original = { "a": "b" };
        const patch = { "a": "c" };
        const expected = { "a": "c" };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":"b"} with {"b":"c"} should result in {"a":"b", "b":"c"}', () => {
        const original = { "a": "b" };
        const patch = { "b": "c" };
        const expected = { "a": "b", "b": "c" };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":"b"} with {"a":null} should result in {}', () => {
        const original = { "a": "b" };
        const patch = { "a": null };
        const expected = {};
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":"b", "b":"c"} with {"a":null} should result in {"b":"c"}', () => {
        const original = { "a": "b", "b": "c" };
        const patch = { "a": null };
        const expected = { "b": "c" };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":["b"]} with {"a":"c"} should result in {"a":"c"}', () => {
        const original = { "a": ["b"] };
        const patch = { "a": "c" };
        const expected = { "a": "c" };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":"c"} with {"a":["b"]} should result in {"a":["b"]}', () => {
        const original = { "a": "c" };
        const patch = { "a": ["b"] };
        const expected = { "a": ["b"] };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a": {"b": "c"}} with {"a": {"b": "d", "c": null}} should result in {"a": {"b": "d"}}', () => {
        const original = { "a": { "b": "c" } };
        const patch = { "a": { "b": "d", "c": null } };
        const expected = { "a": { "b": "d" } };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a": [{"b":"c"}]} with {"a": [1]} should result in {"a": [1]}', () => {
        const original = { "a": [{ "b": "c" }] };
        const patch = { "a": [1] };
        const expected = { "a": [1] };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge ["a","b"] with ["c","d"] should result in ["c","d"]', () => {
        const original = ["a", "b"];
        const patch = ["c", "d"];
        const expected = ["c", "d"];
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":"b"} with ["c"] should result in ["c"]', () => {
        const original = { "a": "b" };
        const patch = ["c"];
        const expected = ["c"];
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":"foo"} with null should result in null', () => {
        const original = { "a": "foo" };
        const patch = null;
        const expected = null;
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"a":"foo"} with "bar" should result in "bar"', () => {
        const original = { "a": "foo" };
        const patch = "bar";
        const expected = "bar";
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {"e":null} with {"a":1} should result in {"e":null, "a":1}', () => {
        const original = { "e": null };
        const patch = { "a": 1 };
        const expected = { "e": null, "a": 1 };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge [1,2] with {"a":"b", "c":null} should result in {"a":"b"}', () => {
        const original = [1, 2];
        const patch = { "a": "b", "c": null };
        const expected = { "a": "b" };
        expect(mergePatch(original, patch)).toEqual(expected);
    });

    test('Merge {} with {"a": {"bb": {"ccc": null}}} should result in {"a": {"bb": {}}}', () => {
        const original = {};
        const patch = { "a": { "bb": { "ccc": null } } };
        const expected = { "a": { "bb": {} } };
        expect(mergePatch(original, patch)).toEqual(expected);
    });


    test('All in one show Case', () => {
        const original =        {
         "title": "Goodbye!",
         "author" : {
       "givenName" : "John",
       "familyName" : "Doe"
         },
         "tags":[ "example", "sample" ],
         "content": "This will be unchanged"
       }

       const patch =   {
         "title": "Hello!",
         "phoneNumber": "+01-123-456-7890",
         "author": {
       "familyName": null
         },
         "tags": [ "example" ]
       }

       const expected =        {
         "title": "Hello!",
         "author" : {
       "givenName" : "John"
         },
         "tags": [ "example" ],
         "content": "This will be unchanged",
         "phoneNumber": "+01-123-456-7890"
       }

       expect(mergePatch(original, patch)).toEqual(expected);

   });
});
