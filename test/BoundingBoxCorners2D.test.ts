import { BoundingBox } from '../src/classes/BoundingBox';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

describe('BoundingBox 2D corners', () => {
    it('corners in simple cases', () => {
        const simpleBoundingBox = BoundingBox.cube();
        expect(simpleBoundingBox.center).toEqual(Vector.zero());
        expect(simpleBoundingBox.topLeft).toEqual(new Vector(-0.5, 0.5));
        expect(simpleBoundingBox.topRight).toEqual(new Vector(0.5, 0.5));
        expect(simpleBoundingBox.bottomLeft).toEqual(new Vector(-0.5, -0.5));
        expect(simpleBoundingBox.bottomRight).toEqual(new Vector(0.5, -0.5));
    });

    it('corners in cases with translate', () => {
        const moveBy = new Vector(1, 1); // TODO: More moveBys
        const movedBoundingBox = BoundingBox.fromTransform(Transform.translate(moveBy));
        expect(movedBoundingBox.center).toEqual(Vector.zero().add(moveBy));
        expect(movedBoundingBox.topLeft).toEqual(new Vector(-0.5, 0.5).add(moveBy));
        expect(movedBoundingBox.topRight).toEqual(new Vector(0.5, 0.5).add(moveBy));
        expect(movedBoundingBox.bottomLeft).toEqual(new Vector(-0.5, -0.5).add(moveBy));
        expect(movedBoundingBox.bottomRight).toEqual(new Vector(0.5, -0.5).add(moveBy));
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
