import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';
import { transformFromStyle } from '../src/utils/transform/transformFromStyle/transformFromStyle';

describe('Conversion of Transform object to SVG', () => {
    it('is working with complex SVG transform ', () => {
        expect(
            transformFromStyle(
                // Note: random whitespaces are here intentionally to test that also non canonical form can be parsed
                `translate(11 13.5)     rotate( 60 ) scale( 1.5 1.5 )`,
            ),
        ).toEqual(
            Transform.fromObject({
                translate: Vector.fromArray(11, 13.5),
                rotate: Math.PI / 3,
                scale: Vector.fromArray(1.5, 1.5, 1),
            }),
        );
    });

    it('is working with just 1 number rotate', () => {
        expect(transformFromStyle(`rotate(60)`)).toEqual(
            Transform.fromObject({
                rotate: Math.PI / 3,
            }),
        );
    });

    it('is working with z SVG rotate ', () => {
        expect(transformFromStyle(`rotate(60 0 0)`)).toEqual(
            Transform.fromObject({
                rotate: Math.PI / 3,
            }),
        );
    });

    it('is working with z deg SVG rotate ', () => {
        expect(transformFromStyle(`rotate(60deg)`)).toEqual(
            Transform.fromObject({
                rotate: Math.PI / 3,
            }),
        );
    });

    it('is working with z rad SVG rotate ', () => {
        expect(transformFromStyle(`rotate(1rad 0 0)`)).toEqual(
            Transform.fromObject({
                rotate: 1,
            }),
        );
    });

    it('is working with z grad SVG rotate ', () => {
        expect(transformFromStyle(`rotate(100grad 0 0)`)).toEqual(
            Transform.fromObject({
                rotate: Math.PI / 2,
            }),
        );
    });

    it('is working with z turn SVG rotate ', () => {
        expect(transformFromStyle(`rotate(1turn 0 0)`)).toEqual(
            Transform.fromObject({
                rotate: Math.PI*2,
            }),
        );
    });

    // TODO: compatibility mode for other SVG transform directives
});
