import { BoundingBox } from '../src/classes/BoundingBox';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

describe('BoundingBox', () => {
    it('Constructing', () => {
        expect(() => BoundingBox.cube()).not.toThrowError();
        expect(() =>
            BoundingBox.fromTransform(Transform.fromObject({ translate: new Vector(1, 2) })),
        ).not.toThrowError();
    });


    it('can be created from two points', () => {
      expect( BoundingBox.fromTwoPoints()).not.toThrowError();


  });



  it('can be created from multiple points', () => {

  });



    // TODO: Other methods and scenarios
});
