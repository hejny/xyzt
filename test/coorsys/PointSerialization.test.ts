import { Coorsys } from '../../src/classes/Coorsys';
import { Vector } from '../../src/classes/Vector';
import { Point } from '../../src/classes/Point';

describe('how serialize and deserialize Point', () => {
    const screenSize = new Vector(1920, 1200);
    const screen = new Coorsys('screen', {});
    const screenCentered = screen.createRelatedCoorsys('screenCentered', {
        translate: screenSize.half(),
    });

    const point = new Point(screenCentered, { x: 100, y: 100 });

    it('can be serialized', () => {
        expect(() => point.toObject()).not.toThrowError();
    });

    it('can be serialized and deserialized', () => {
        const pointSerialized = point.toObject();
        expect(Point.fromObject([screenCentered, screen], pointSerialized)).toEqual(point);
    });

    it('can not be deserialized when do not have propper library ', () => {
        const pointSerialized = point.toObject();
        expect(() => Point.fromObject([screen], pointSerialized)).toThrowError();
    });
});
