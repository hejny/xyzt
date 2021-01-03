import { Coorsys } from '../../src/classes/Coorsys';
import { Vector } from '../../src/classes/Vector';
import { VectorInCoorsys } from '../../src/classes/VectorInCoorsys';

describe('how serialize and deserialize VectorInCoorsys', () => {
    const screenSize = new Vector(1920, 1200);
    const screen = new Coorsys('screen', {});
    const screenCentered = screen.createRelatedCoorsys('screenCentered', {
        translate: screenSize.half(),
    });

    const point = new VectorInCoorsys(screenCentered, { x: 100, y: 100 });

    it('can be serialized', () => {
        expect(() => point.toObject()).not.toThrowError();
    });

    it('can be serialized and deserialized', () => {
        const pointSerialized = point.toObject();
        expect(VectorInCoorsys.fromObject([screenCentered, screen], pointSerialized)).toEqual(point);
    });

    it('can not be deserialized when do not have propper library ', () => {
        const pointSerialized = point.toObject();
        expect(() => VectorInCoorsys.fromObject([screen], pointSerialized)).toThrowError();
    });
});
