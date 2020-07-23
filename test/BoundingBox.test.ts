
import { BoundingBox } from '../src/BoundingBox';
import { Vector } from '../src/Vector';


describe('BoundingBox', () => {
    const boundingBox1 = new BoundingBox(new Vector(1, 1), new Vector(2, 2), 0);

    it('intersects is working.', () => {
        expect(boundingBox1.intersects(new Vector(1, 1))).toEqual(true);
        expect(boundingBox1.intersects(new Vector(2, 2))).toEqual(true);
        expect(boundingBox1.intersects(new Vector(3, 3))).toEqual(false);
    });
});
