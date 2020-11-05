import { Vector } from '../src/classes/Vector';

describe('Vector2', () => {
    it('Constructing', () => {
        expect(Vector.fromArray()).toEqual(Vector.fromObject({}));
        expect(Vector.fromArray(1, 2)).toEqual(
            Vector.fromObject({ x: 1, y: 2 }),
        );
        expect(Vector.fromArray([1, 2])).toEqual(
            Vector.fromObject({ x: 1, y: 2 }),
        );
        expect(Vector.fromObject({ x: 1, y: 2 })).toEqual(
            Vector.fromArray(1, 2),
        );
        expect(Vector.fromObject({ top: 2, left: 1 }, ['left', 'top'])).toEqual(
            Vector.fromArray(1, 2),
        );
        expect(
            Vector.fromObject({ clientX: 1, clientY: 2 }, [
                'clientX',
                'clientY',
            ]),
        ).toEqual(Vector.fromArray(1, 2));
    });

    it('isEqual', () => {
        expect(Vector.isEqual(Vector.fromArray(0, 0), {})).toBe(true);
        expect(Vector.isEqual({}, {})).toBe(true);
        expect(Vector.isEqual(Vector.fromArray(), Vector.fromArray(0, 0))).toBe(
            true,
        );
        expect(
            Vector.isEqual(Vector.fromObject({}), Vector.fromArray(0, 0)),
        ).toBe(true);
        expect(
            Vector.isEqual(Vector.fromArray(1, 1), Vector.fromArray(1, 1)),
        ).toBe(true);
        expect(
            Vector.isEqual(
                Vector.fromArray(1, 1),
                Vector.fromObject({ x: 1, y: 1 }).clone(),
            ),
        ).toBe(true);
        expect(Vector.isEqual(Vector.fromArray(1, 1, 1), Vector.box(1))).toBe(
            true,
        );
        expect(Vector.isEqual(Vector.fromArray(1, 1), Vector.box(1))).toBe(
            false,
        );
        expect(
            Vector.isEqual(
                Vector.fromArray(1, 1),
                Vector.fromArray(1, 1)
                    .scale(100)
                    .scale(1 / 100),
            ),
        ).toBe(true);
        expect(
            Vector.isEqual(
                Vector.fromArray(1, 1),
                Vector.fromArray(2, 2).half(),
            ),
        ).toBe(true);

        expect(
            Vector.isEqual(Vector.fromArray(1, 1), Vector.fromArray(2, 2)),
        ).toBe(false);
        expect(Vector.isEqual(Vector.fromArray(1, 1), {})).toBe(false);
    });

    it('distance', () => {
        expect(Vector.fromArray(1, 1).distance()).toBeCloseTo(1.4142, 2);
        expect(Vector.fromArray(2, 2).distance()).toBeCloseTo(1.4142 * 2, 2);
        expect(
            Vector.fromArray(2, 2).distance(Vector.fromArray(1, 1)),
        ).toBeCloseTo(1.4142, 2);
        expect(Vector.fromArray(2, 2).distance(Vector.fromArray(1, 2))).toEqual(
            1,
        );
    });

    // TODO: Other methods
});
