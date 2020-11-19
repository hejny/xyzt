import { toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { Vector } from '../src/classes/Vector';

expect.extend({ toMatchCloseTo });

describe('Vector', () => {
    it('can be constructed multiple ways', () => {
        // TODO: From IVectorObject and number[]

        expect(new Vector(1, 2)).toEqual(Vector.fromObject({ x: 1, y: 2 }));
        expect(new Vector(1, 2, 3)).toEqual(
            Vector.fromObject({ x: 1, y: 2, z: 3 }),
        );

        expect(new Vector({ x: 1, y: 2 })).toEqual(new Vector(1, 2));
        expect(new Vector({ x: 1, y: 2, z: 3 })).toEqual(
            Vector.fromObject({ x: 1, y: 2, z: 3 }),
        );

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

        // !!! fromPolar
    });

    it('can be compared by isEqual', () => {
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

    it('count distance', () => {
        expect(Vector.fromArray(1, 1).distance()).toBeCloseTo(1.4142, 2);
        expect(Vector.fromArray(2, 2).distance()).toBeCloseTo(1.4142 * 2, 2);
        expect(
            Vector.fromArray(2, 2).distance(Vector.fromArray(1, 1)),
        ).toBeCloseTo(1.4142, 2);
        expect(Vector.fromArray(2, 2).distance(Vector.fromArray(1, 2))).toEqual(
            1,
        );
    });

    it('count rotation', () => {});

    it('count cross product', () => {
        expect(
            Vector.fromArray(2, 3, 4)
                .crossProduct(Vector.fromArray(5, 6, 7))
                .toArray(),
        ).toEqual([-3, 6, -3]);
    });

    it('count dot product', () => {
        expect(
            Vector.fromArray(1, 2, 3).dotProduct(Vector.fromArray(4, -5, 6)),
        ).toEqual(12);
    });

    it('can be serialized to multiple formats', () => {
        expect(Vector.fromArray(1, 2, 3).toJSON()).toEqual({
            x: 1,
            y: 2,
            z: 3,
        });
        expect(Vector.fromArray(1, 2, 3).toObject()).toEqual({
            x: 1,
            y: 2,
            z: 3,
        });
        expect(Vector.fromArray(1, 2, 3).toObject2D()).toEqual({ x: 1, y: 2 });
        expect(Vector.fromArray(1, 2, 3).toObject3D()).toEqual({
            x: 1,
            y: 2,
            z: 3,
        });
        expect(Vector.fromArray(1, 2, 3).toArray()).toEqual([1, 2, 3]);
        expect(Vector.fromArray(1, 2, 3).toArray2D()).toEqual([1, 2]);
        expect(Vector.fromArray(1, 2, 3).toArray3D()).toEqual([1, 2, 3]);
        expect(Vector.fromArray(1, 2, 3).toString()).toEqual(`[1,2,3]`);
        expect(Vector.fromArray(1, 2, 3).toString2D()).toEqual(`[1,2]`);
        expect(Vector.fromArray(1, 2, 3).toString3D()).toEqual(`[1,2,3]`);
    });

    it('can be converted via forPlane', () => {
        expect(
            new Vector(1, 2, 3)
                .forPlane('x', ({ x, y }) => new Vector(y, x))
                .toArray(),
        ).toEqual([1, 3, 2]);
        expect(
            new Vector(1, 2, 3)
                .forPlane('y', ({ x, y }) => new Vector(y, x))
                .toArray(),
        ).toEqual([3, 2, 1]);
        expect(
            new Vector(1, 2, 3)
                .forPlane('z', ({ x, y }) => new Vector(y, x))
                .toArray(),
        ).toEqual([2, 1, 3]);
    });

    it('can be converted via forEachPlane', () => {
        expect(
            new Vector(1, 2, 3)
                .forEachPlane((axis, { x, y }) => new Vector(y, x))
                .toArray(),
        ).toEqual([3, 2, 1]);
    });

    it('rotate zero vector with no rotation', () => {
        expect(Vector.zero().rotate(Vector.zero())).toEqual(Vector.zero());
    });

    it('rotate zero vector with rotation', () => {
        expect(
            Vector.zero().rotate(
                new Vector(Math.PI / 2, Math.PI / 3, Math.PI / 4),
            ),
        ).toEqual(Vector.zero());
    });

    it('rotate vector with no rotation', () => {
        (expect as any)(
            new Vector(1, 2, 3).rotate(Vector.zero()).toJSON(),
        ).toMatchCloseTo(new Vector(1, 2, 3).toJSON());
    });

    it('can be rotated (along axis Z)', () => {
        (expect as any)(
            new Vector(1, 2, 3).rotate(new Vector(0, 0, Math.PI / 2)).toJSON(),
        ).toMatchCloseTo(new Vector(-2, 1, 3).toJSON());
    });

    it('can be rotated multiple ways and to same result', () => {
        (expect as any)(
            new Vector(1, 2, 3)
                .rotate(new Vector(1, 1, 0))
                .rotate(new Vector(0, 0, 1))
                .toJSON(),
        ).toMatchCloseTo(
            new Vector(1, 2, 3).rotate(new Vector(1, 1, 1)).toJSON(),
        );
    });

    it('can be rotated multiple ways and to same result', () => {
        (expect as any)(
            new Vector(1, 2, 3)
                .rotate(new Vector(1, 1, 0))
                .rotate(new Vector(0, 0, 1))
                .toJSON(),
        ).toMatchCloseTo(
            new Vector(1, 2, 3).rotate(new Vector(1, 1, 1)).toJSON(),
        );
    });

    // TODO: Other methods
});
