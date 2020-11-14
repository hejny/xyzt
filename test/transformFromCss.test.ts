import { toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';
import { transformFromStyle } from '../src/utils/transform/transformFromStyle/transformFromStyle';

expect.extend({ toMatchCloseTo });

// TODO: Figure out how to write it better then "...as any).toBeDeepCloseTo..."

describe('Conversion of Transform object to CSS', () => {
    /*
    TODO: 
    it('throws on broken CSS strings', () => {
        expect(() => transformFromCSS(`woooo`)).toThrowError();
        expect(() => transformFromCSS(`hello(15px,5px)`)).toThrowError();
    });
    */

    it('is working with complex CSS transform ', () => {
        (expect(
            transformFromStyle(
                // Note: random whitespaces are here intentionally to test that also non canonical form can be parsed
                `translate(11px, 13.5px)     rotate( 60deg ) scale( 1.5 , 1.5 )`,
            ).toJSON(),
        ) as any).toMatchCloseTo(
            Transform.fromObject({
                translate: Vector.fromArray(11, 13.5),
                rotate: Math.PI / 3,
                scale: Vector.fromArray(1.5, 1.5, 1),
            }).toJSON(),
        );
    });

    it('is working with z deg CSS rotate ', () => {
        (expect(
            transformFromStyle(`rotate(60deg)`).toJSON(),
        ) as any).toMatchCloseTo(
            Transform.fromObject({
                rotate: Math.PI / 3,
            }).toJSON(),
        );
    });

    it('is working with z grad CSS rotate ', () => {
        (expect(
            transformFromStyle(`rotate(100grad)`).toJSON(),
        ) as any).toMatchCloseTo(
            Transform.fromObject({
                rotate: Math.PI / 2,
            }).toJSON(),
        );
    });

    it('is working with z rad CSS rotate ', () => {
        expect(transformFromStyle(`rotate(1rad)`)).toEqual(
            Transform.fromObject({
                rotate: 1,
            }),
        );
    });

    it('is working with z turn CSS rotate ', () => {
        expect(transformFromStyle(`rotate(1turn)`)).toEqual(
            Transform.fromObject({
                rotate: Math.PI * 2,
            }),
        );
    });

    // TODO: rotate3d

    // TODO: compatibility mode for other CSS transform directives as matrix, scaleX, scaleY, etc.
});
