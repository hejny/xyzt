import { toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

expect.extend({ toMatchCloseTo });

describe('interaction between vector and transform', () => {
    it('transform can be aplied on vector', () => {
        (expect as any)(
            new Vector(1, 2).apply(Transform.neutral()).toJSON(),
        ).toMatchCloseTo(new Vector(1, 2).toJSON());
        (expect as any)(
            new Vector(0, 2).apply(Transform.rotate(Math.PI)).toJSON(),
        ).toMatchCloseTo(new Vector(0, -2).toJSON());

        // TODO: more
    });

    // TODO: more
});
