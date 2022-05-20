import { BoundingBox } from '../src/classes/BoundingBox';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

describe('BoundingBox', () => {
    it('Constructing', () => {
        expect(() => BoundingBox.cube()).not.toThrowError();
        expect(() =>
            BoundingBox.fromTransform(Transform.fromObject({ translate: new Vector(1, 2) })),
        ).not.toThrowError();
    });

    for (const [topLeft, bottomRight] of [
        [new Vector(0, 0), new Vector(1, 1)],
        [new Vector(0, 0), new Vector(2, 2)],
        [new Vector(0, 0), new Vector(10, 10)],
        [new Vector(-1, 0), new Vector(1, 1)],
        [new Vector(0, -5), new Vector(1, 1)],
        [new Vector(50, 50), new Vector(100, 100)],
        [new Vector(-5, 8), new Vector(1, 1000)],
    ]) {
        it(`can be created from two points ${topLeft} and ${bottomRight}`, () => {
            for (const boundingBox of [
                BoundingBox.fromPoints(topLeft, bottomRight),
                BoundingBox.fromPoints(bottomRight, topLeft),
                BoundingBox.fromPoints(topLeft, bottomRight, topLeft, bottomRight),
            ]) {
                expect(boundingBox.topLeft).toEqual(topLeft);
                expect(boundingBox.bottomRight).toEqual(bottomRight);
                expect(boundingBox).toEqual(
                    BoundingBox.fromTransform({
                        translate: Vector.add(topLeft, bottomRight).half(),
                        scale: bottomRight.subtract(topLeft),
                    }),
                );
            }
        });
    }

    // TODO: it('can be created from multiple points', () => {});
    it('can be created from DomRect', () => {
        const boundingBox = BoundingBox.fromDomRect({ x: 1, y: 1, width: 2, height: 3 });
        expect(boundingBox.topLeft).toEqual(new Vector(1, 1));
        expect(boundingBox.bottomRight).toEqual(new Vector(3, 4));
    });

    it('can be merged', () => {
        const boundingBox = BoundingBox.merge(
            BoundingBox.fromDomRect({ x: 1, y: 1, width: 2, height: 3 }),
            BoundingBox.fromDomRect({ x: -1, y: -1, width: 2, height: 3 }),
            BoundingBox.fromDomRect({ x: 0, y: -5, width: 4, height: 4 }),
        );
        expect(boundingBox.topLeft).toEqual(new Vector(1, 1));
        expect(boundingBox.bottomRight).toEqual(new Vector(3, 4));
    });

    // TODO: Other methods and scenarios
});
