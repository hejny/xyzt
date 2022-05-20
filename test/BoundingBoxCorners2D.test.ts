import { BoundingBox } from '../src/classes/BoundingBox';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

describe('BoundingBox 2D corners', () => {
    for (const { translate, scale } of [
        { translate: new Vector(0, 0), scale: new Vector(1, 1) },
        { translate: new Vector(1, 1), scale: new Vector(1, 1) },
        { translate: new Vector(1, 1), scale: new Vector(1, 1) },
        { translate: new Vector(1, 1), scale: new Vector(2, 2) },
        { translate: new Vector(1, 2), scale: new Vector(3, 4) },
        { translate: new Vector(-50, -11), scale: new Vector(23, 28) },
    ]) {
        const boundingBox = BoundingBox.fromTransform({ translate, scale });

        it(`corners in cases with ${boundingBox}`, () => {
            expect(boundingBox.center).toEqual(Vector.zero().add(translate));
            expect(boundingBox.topLeft).toEqual(new Vector(-0.5, -0.5).multiply(scale).add(translate));
            expect(boundingBox.topRight).toEqual(new Vector(0.5, -0.5).multiply(scale).add(translate));
            expect(boundingBox.bottomLeft).toEqual(new Vector(-0.5, 0.5).multiply(scale).add(translate));
            expect(boundingBox.bottomRight).toEqual(new Vector(0.5, 0.5).multiply(scale).add(translate));
        });
    }

    /*
    const scaledBoundingBox = BoundingBox.fromTransform(Transform.scale(2));

    it('corners in cases with scale', () => {
    });

    const rotatedBoundingBox = BoundingBox.fromTransform(
        Transform.rotate(Math.PI / 4),
    );
    it('corners in cases with rotate', () => {
        for (const k of [1, 0.99, 0.5, 0, -0.5]) {

        }
    });

    it('corners in cases with scale+rotate+translate', () => {
        // TODO:
    });

    */
});
