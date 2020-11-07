import { Transform } from '../src/classes/Transform';

describe('Creating css transform from Transform object and reverse', () => {
    it('initialization', () => {
        expect(() => Transform.fromObject({})).not.toThrowError();
        // TODO: More
    });

    it('combine', () => {
        expect(
            Transform.combine(
                {
                    translate: { x: 1, y: 2, z: 3 },
                },
                {
                    translate: { x: 1, y: 2, z: 3 },
                },
            ).toObject(),
        ).toEqual({
            translate: { x: 2, y: 4, z: 6 },
        });
        // TODO: More
    });

    it('negate', () => {
        // TODO:
    });

    it('subtract', () => {
        // TODO:
    });
});
