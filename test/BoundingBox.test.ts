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
