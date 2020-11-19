import { Transform } from '../src/classes/Transform';
import { transformComplexSamples } from './transformComplexSamples';

describe('Transform is commutative ', () => {
    it('is commutative when combine', () => {
        for (const transform1 of transformComplexSamples) {
            for (const transform2 of transformComplexSamples) {
                expect(Transform.combine(transform1, transform2)).toEqual(
                    Transform.combine(transform1, transform2),
                );
            }
        }
    });
});
