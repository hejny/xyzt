import { BoundingBox } from '../src/classes/BoundingBox';
import { Vector } from '../src/classes/Vector';
import { vectorSamples } from './vectorSamples';
import { createTuples } from './_createTuples';

describe('constructing BoundingBox fromPoints', () => {
    it('can construct BoundingBox from one point and every corner+center will be that point', () => {
        for (const vector of vectorSamples) {
            const boundingBox = BoundingBox.fromPoints(vector);
            expect(boundingBox.center).toBe(vector);
            expect(boundingBox.topLeft).toBe(vector);
            expect(boundingBox.topRight).toBe(vector);
            expect(boundingBox.bottomLeft).toBe(vector);
            expect(boundingBox.bottomRight).toBe(vector);
        }
    });

    for (let pointsCount = 2; pointsCount < 5; pointsCount++) {
        it(`can construct BoundingBox from ${pointsCount} points and points will be in intersecting the BoundingBox`, () => {
            for (const vectors of createTuples({
                items: vectorSamples,
                itemsPerTuple: 2,
                onePermutation: true,
            })) {
                const boundingBox = BoundingBox.fromPoints(...vectors);
                for (const vector of vectors) {
                    expect(boundingBox.intersects(vector)).toBe(true);
                }
            }
        });
    }

    // TODO: !!! Not intersecting

    // TODO: More tests
});
