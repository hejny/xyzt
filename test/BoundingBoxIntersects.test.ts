import { BoundingBox } from '../src/classes/BoundingBox';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

describe('BoundingBox intersects', () => {

    const simpleBoundingBox = BoundingBox.one();

    it('intersects in simple cases', () => {
        expect(simpleBoundingBox.intersects(new Vector(0,0))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(0.1,0.1))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(-.4,0.4))).toBe(true);
    });

    it('not intersects in simple cases', () => {
        expect(simpleBoundingBox.intersects(new Vector(10,10))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(0,10))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(-10,10))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(1.0001,0))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(0,1))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(1,0))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(0,-1))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(-1,0))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(-1,-1))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(1,1))).toBe(false);
        expect(simpleBoundingBox.intersects(new Vector(1,0.5))).toBe(false);
    });


    it('intersects edges in simple cases', () => {
        expect(simpleBoundingBox.intersects(new Vector(0,.5))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(.5,0))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(0,-.5))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(-.5,0))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(-.5,-.5))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(.5,.5))).toBe(true);
        expect(simpleBoundingBox.intersects(new Vector(.5,0.25))).toBe(true);
    });

    const movedBoundingBox = BoundingBox.fromTransform(Transform.translate(new Vector(1,1)));
    
    it('intersects in cases with translate', () => {
        expect(movedBoundingBox.intersects(new Vector(0.5,0.5))).toBe(true);
        expect(movedBoundingBox.intersects(new Vector(1,1))).toBe(true);
        expect(movedBoundingBox.intersects(new Vector(1.5,1.5))).toBe(true);
       
    });

    it('not intersects in cases with translate', () => {
        expect(movedBoundingBox.intersects(new Vector(-0.5,-0.5))).toBe(false);
        expect(movedBoundingBox.intersects(new Vector(0.4,0.4))).toBe(false);
        expect(movedBoundingBox.intersects(new Vector(2,2))).toBe(false);
    });

    const scaledBoundingBox = BoundingBox.fromTransform(Transform.scale(2));

    it('intersects in cases with scale', () => {
        expect(scaledBoundingBox.intersects(new Vector(0,.5))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(.5,0))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(0,-.5))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(-.5,0))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(-.5,-.5))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(.5,.5))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(.5,0.25))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(0,1))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(1,0))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(0,-1))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(-1,0))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(-1,-1))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(1,1))).toBe(true);
        expect(scaledBoundingBox.intersects(new Vector(1,0.5))).toBe(true);
    });

    it('not intersects in cases with scale', () => {
        expect(scaledBoundingBox.intersects(new Vector(0,1.1))).toBe(false);
        expect(scaledBoundingBox.intersects(new Vector(1.1,0))).toBe(false);
        expect(scaledBoundingBox.intersects(new Vector(0,-1.1))).toBe(false);
        expect(scaledBoundingBox.intersects(new Vector(-1.1,0))).toBe(false);
        expect(scaledBoundingBox.intersects(new Vector(-1.1,-1.1))).toBe(false);
        expect(scaledBoundingBox.intersects(new Vector(1.1,1.1))).toBe(false);
        expect(scaledBoundingBox.intersects(new Vector(1.1,0.5))).toBe(false);
    });

    const rotatedBoundingBox = BoundingBox.fromTransform(Transform.rotate(Math.PI/4));
    it('intersects in cases with rotate', () => {
        for(const k of [1,0.99,0.5,0,-.5]){
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(k,k)))).toBe(true);
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(-k,k)))).toBe(true);
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(k,-k)))).toBe(true);
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(-k,-k)))).toBe(true);
        }
    });

    it('not intersects in cases with rotate', () => {
        for(const k of [1.1,2]){
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(k,k)))).toBe(false);
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(-k,k)))).toBe(false);
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(k,-k)))).toBe(false);
            expect(rotatedBoundingBox.intersects(Vector.box(Math.sqrt(2)/4).multiply(new Vector(-k,-k)))).toBe(false);
        }
    });

    it('intersects in cases with scale+rotate+translate', () => {
        // TODO:
    });

    it('not intersects in cases with scale+rotate+translate', () => {
         // TODO:
    });

});
