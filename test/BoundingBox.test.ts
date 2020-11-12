import { BoundingBox } from '../src/classes/BoundingBox';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

describe('BoundingBox', () => {
    it('Constructing', () => {
        expect(() => BoundingBox.one()).not.toThrowError();
        expect(() =>
            BoundingBox.fromTransform(
                Transform.fromObject({ translate: new Vector(1, 2) }),
            ),
        ).not.toThrowError();
    });

    // TODO: Other methods and scenarios
});
