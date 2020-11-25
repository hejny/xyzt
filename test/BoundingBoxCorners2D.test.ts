import { BoundingBox } from '../src/classes/BoundingBox';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

describe('BoundingBox 2D corners', () => {
    it('corners in simple cases', () => {
        const simpleBoundingBox = BoundingBox.cube();
        expect(Vector.isEqual(simpleBoundingBox.center, Vector.zero())).toBe(true);
        expect(Vector.isEqual(simpleBoundingBox.topLeft, new Vector(-0.5, -0.5))).toBe(true);
        expect(Vector.isEqual(simpleBoundingBox.topRight, new Vector(0.5, -0.5))).toBe(true);
        expect(Vector.isEqual(simpleBoundingBox.bottomLeft, new Vector(-0.5, 0.5))).toBe(true);
        expect(Vector.isEqual(simpleBoundingBox.bottomRight, new Vector(0.5, 0.5))).toBe(true);
    });

    it('corners in cases with translate', () => {
        const movedBoundingBox = BoundingBox.fromTransform(Transform.translate(new Vector(1, 1)));
        console.log(movedBoundingBox.topLeft);
        expect(Vector.isEqual(movedBoundingBox.center, Vector.square())).toBe(true);
        expect(Vector.isEqual(movedBoundingBox.topLeft, new Vector(0.5, 0.5))).toBe(true);
        expect(Vector.isEqual(movedBoundingBox.topRight, new Vector(0.5, -0.5))).toBe(true);
        expect(Vector.isEqual(movedBoundingBox.bottomLeft, new Vector(-0.5, 0.5))).toBe(true);
        expect(Vector.isEqual(movedBoundingBox.bottomRight, new Vector(0.5, 0.5))).toBe(true);
    });

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
