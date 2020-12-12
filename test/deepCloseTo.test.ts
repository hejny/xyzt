import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { Vector } from '../src/classes/Vector';
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

// TODO: Figure out how to write it better then "...as any).toBeDeepCloseTo..."

describe('test myModule', () => {
    it('should return 42', () => {
        (expect([42.0003]) as any).toBeDeepCloseTo([42.0004], 3);
    });
});

describe('test myModule', () => {
    it('should return 42', () => {
        (expect as any)({
            foo: 42.0003,
            bar: 'xxx',
            baz: 'yyy',
        }).toMatchCloseTo({ foo: 42.0004, bar: 'xxx' }, 3);
    });
});

describe('Constructed objects with toBeDeepCloseTo', () => {
    it('should work with Vector', () => {
        (expect(Vector.box(42).toJSON()) as any).toBeDeepCloseTo(Vector.box(42.000001).toJSON(), 3);
    });
});
