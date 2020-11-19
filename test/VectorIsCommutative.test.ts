import { Vector } from '../src/classes/Vector';
import { vectorSamples } from './vectorSamples';

describe('Vector is commutative ', () => {
    it('is commutative when adding', () => {
        for (const vector1 of vectorSamples) {
            for (const vector2 of vectorSamples) {
                expect(Vector.add(vector1, vector2)).toEqual(
                    Vector.add(vector2, vector1),
                );
            }
        }
    });

    it('is commutative when multipling', () => {
        for (const vector1 of vectorSamples) {
            for (const vector2 of vectorSamples) {
                expect(Vector.multiply(vector1, vector2)).toEqual(
                    Vector.multiply(vector2, vector1),
                );
            }
        }
    });

    it('is commutative when v1 x v2 = -(v2 x v1) ', () => {
        for (const vector1 of vectorSamples) {
            for (const vector2 of vectorSamples) {
                expect(Vector.crossProduct(vector1, vector2)).toEqual(
                    Vector.crossProduct(vector2, vector1).negate(),
                );
            }
        }
    });

    it('is commutative when dot product', () => {
        for (const vector1 of vectorSamples) {
            for (const vector2 of vectorSamples) {
                expect(Vector.dotProduct(vector1, vector2)).toEqual(
                    Vector.dotProduct(vector2, vector1),
                );
            }
        }
    });

    it('is commutative when distance', () => {
        for (const vector1 of vectorSamples) {
            for (const vector2 of vectorSamples) {
                expect(Vector.distance(vector1, vector2)).toEqual(
                    Vector.distance(vector2, vector1),
                );
            }
        }
    });

    // TODO: More
});
