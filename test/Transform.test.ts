import { Transform } from '../src/classes/Transform';

describe('Creating css transform from Transform object and reverse', () => {
    it('initialization', () => {
        expect(() => Transform.fromObject({})).not.toThrowError();
        // TODO: More
    });

    // TODO: Other methods
});
