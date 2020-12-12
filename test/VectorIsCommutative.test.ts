import { Vector } from '../src/classes/Vector';
import { vectorSamples } from './samples/vectorSamples';

describe('Vector is commutative ', () => {
    it('is commutative when adding', () => {
        for (const vectorA of vectorSamples) {
            for (const vectorB of vectorSamples) {
                expect(Vector.add(vectorA, vectorB)).toEqual(Vector.add(vectorB, vectorA));
            }
        }
    });

    it('is commutative when multipling', () => {
        for (const vectorA of vectorSamples) {
            for (const vectorB of vectorSamples) {
                expect(Vector.multiply(vectorA, vectorB)).toEqual(Vector.multiply(vectorB, vectorA));
            }
        }
    });

    it('is commutative when v1 x v2 = -(v2 x v1) ', () => {
        for (const vectorA of vectorSamples) {
            for (const vectorB of vectorSamples) {
                expect(Vector.crossProduct(vectorA, vectorB)).toEqual(Vector.crossProduct(vectorB, vectorA).negate());
            }
        }
    });

    it('is commutative when dot product', () => {
        for (const vectorA of vectorSamples) {
            for (const vectorB of vectorSamples) {
                expect(Vector.dotProduct(vectorA, vectorB)).toEqual(Vector.dotProduct(vectorB, vectorA));
            }
        }
    });

    it('is commutative when distance', () => {
        for (const vectorA of vectorSamples) {
            for (const vectorB of vectorSamples) {
                expect(Vector.distance(vectorA, vectorB)).toEqual(Vector.distance(vectorB, vectorA));
            }
        }
    });

    // TODO: More
});
