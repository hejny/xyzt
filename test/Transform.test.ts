import { toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

expect.extend({ toMatchCloseTo });
describe('initialization of Transform', () => {
    it('initialize by neutral', () => {
        expect(() => Transform.neutral()).not.toThrowError();
    });

    it('initialize by translate', () => {
        expect(() => Transform.translate({ x: 1, y: 2 })).not.toThrowError();
        expect(Transform.translate({ x: 1, y: 2 }).translate).toEqual(new Vector(1, 2));
    });

    it('initialize by rotate', () => {
        expect(() => Transform.rotate(Math.PI / 3)).not.toThrowError();
        (expect as any)(Transform.rotate(Math.PI / 3).rotate.toJSON()).toMatchCloseTo(
            new Vector(0, 0, Math.PI / 3).toJSON(),
        );
        (expect as any)(Transform.rotate({ z: Math.PI / 3 }).rotate.toJSON()).toMatchCloseTo(
            new Vector(0, 0, Math.PI / 3).toJSON(),
        );
    });

    it('initialize by scale', () => {
        expect(() => Transform.scale(3)).not.toThrowError();
        expect(Transform.scale(3).scale).toEqual(new Vector(3, 3, 3));
        (expect as any)(Transform.scale({ x: 1, y: 2, z: 3 }).scale.toJSON()).toMatchCloseTo(
            new Vector(1, 2, 3).toJSON(),
        );
    });

    it('initialize by fromObject', () => {
        expect(() => Transform.fromObject({})).not.toThrowError();
        // TODO: More
    });

    it('clone', () => {
        expect(() => Transform.clone({})).not.toThrowError();
        // TODO: Test cloning
    });
});

describe('Transform expirting', () => {
    it('pick', () => {
        // TODO:
        //expect(Transform.fromObject({}))
    });
});

describe('Operations with Transform', () => {
    it('apply', () => {
        expect(
            Transform.fromObject({
                translate: { x: 1, y: 2, z: 3 },
            })
                .apply(
                    Transform.fromObject({
                        translate: { x: 1, y: 2, z: 3 },
                    }),
                )
                .toObject(),
        ).toEqual({
            translate: { x: 2, y: 4, z: 6 },
        });
        // TODO: More
    });

    it('negate', () => {
        // TODO:
    });
});

describe('Operations with Transform and Vector', () => {
    it('do nothing with zero vector and neutral transform', () =>
        (expect as any)(Transform.neutral().applyOnVector(Vector.zero()).toJSON()).toMatchCloseTo(
            Vector.zero().toJSON(),
        ));

    it('do nothing with vector and neutral transform', () =>
        (expect as any)(Transform.neutral().applyOnVector(new Vector(1, 2, 3)).toJSON()).toMatchCloseTo(
            new Vector(1, 2, 3).toJSON(),
        ));

    it('rotate zero vector', () =>
        (expect as any)(
            Transform.rotate(Math.PI / 2)
                .applyOnVector(Vector.zero())
                .toJSON(),
        ).toMatchCloseTo(Vector.zero().toJSON()));

    it('rotate with preserving z axis', () =>
        (expect as any)(
            Transform.rotate(Math.PI / 2)
                .applyOnVector(new Vector(1, 0, 33))
                .toJSON(),
        ).toMatchCloseTo(new Vector(0, 1, 33).toJSON()));
});
