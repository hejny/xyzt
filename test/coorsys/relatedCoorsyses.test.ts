import { Coorsys } from '../../src/classes/Coorsys';
import { VectorInCoorsys } from '../../src/classes/VectorInCoorsys';
import { Vector } from '../../src/classes/Vector';

describe('how related Coorsyses works', () => {
    it('can convert vector in screen and screenCentered', () => {
        //const screenSize = { x: 1920, y: 1200};
        const screenSize = new Vector(500, 500);

        const screen = new Coorsys('screen', {});
        const screenCentered = screen.createRelatedCoorsys('screenCentered', {
            translate: screenSize.half(),
        });

        const pointAfromCenter = new VectorInCoorsys(screenCentered, { x: 100, y: 100 });
        const pointAfromScreen = pointAfromCenter.in(screen);

        expect(pointAfromScreen.vector.toObject2D()).toEqual({ x: 350, y: 350 });
    });
});
