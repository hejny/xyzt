import { Transform } from '../src/classes/Transform';
import { transformBasicSamples } from './transformBasicSamples';

export const transformComplexSamples = (() => {
    const transforms: Transform[] = [];
    for (const transform1 of transformBasicSamples) {
        for (const transform2 of transformBasicSamples) {
            for (const transform3 of transformBasicSamples) {
                transforms.push(transform1.apply(transform2).apply(transform3));
            }
        }
    }
    return transforms;
})();
