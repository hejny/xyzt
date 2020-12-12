import { transformBasicSamples } from '../samples/transformBasicSamples';
import { transformComplexSamples } from '../samples/transformComplexSamples';
import { vectorSamples } from '../samples/vectorSamples';

describe('IInversible', () => {
    it('Vector is inversible', () => {
        for (const vector of vectorSamples) {
            expect(vector.inverse().inverse()).toEqual(vector);
        }
    });

    it('Transform is inversible with basic samples', () => {
        for (const transform of transformBasicSamples) {
            expect(transform.inverse().inverse()).toEqual(transform);
        }
    });

    it('Transform is inversible with complex samples', () => {
        for (const transform of transformComplexSamples) {
            expect(transform.inverse().inverse()).toEqual(transform);
        }
    });

    it('Vector.inversible is pure', () => {
        for (const vector of vectorSamples) {
            expect(vector.inverse()).toEqual(vector.inverse());
        }
    });

    it('Transform.inversible is pure', () => {
        for (const transform of [...vectorSamples, ...transformComplexSamples]) {
            expect(transform.inverse()).toEqual(transform.inverse());
        }
    });
});
