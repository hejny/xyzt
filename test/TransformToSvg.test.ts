import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';
import { transformToStyleSvg } from '../src/utils/transform/transformToStyle/transformToStyleSvg';

describe('Conversion of SVG transform attribute to Transform object', () => {
    it('is working with translate to SVG ', () => {
        expect(transformToStyleSvg(Transform.fromObject({ translate: Vector.fromArray(10, 15) }))).toBe(
            `translate(10 15)`,
        );
    });

    it('is working with rotate to SVG ', () => {
        expect(transformToStyleSvg(Transform.fromObject({ rotate: Math.PI }))).toBe(`rotate(180)`);
        expect(transformToStyleSvg(Transform.fromObject({ rotate: Math.PI * 3 }))).toBe(`rotate(180)`);
        expect(transformToStyleSvg(Transform.fromObject({ rotate: -Math.PI }))).toBe(`rotate(180)`);
        expect(transformToStyleSvg(Transform.fromObject({ rotate: Vector.fromArray(1, 2, 0) }))).toBe(``);
    });

    /*
    it('is working with scale', () => {
         // TODO: Test scale
        expect(transformToStyleSvg(Transform.fromObject({ scale: 1 }))).toBe(
            `rotate(180deg)`,
        );
    });

    it('is working with skew', () => {
        // TODO: Test skew
    });
    */

    it('is working with complex Transforms to SVG ', () => {
        expect(
            transformToStyleSvg(
                Transform.fromObject({
                    translate: Vector.fromArray(11, 13.5, 17),
                    rotate: Math.PI / 3,
                    scale: 1.5,
                    // Note: Skew will be available in the future> skew: Vector.fromArray(Math.PI / 3, Math.PI / 2),
                }),
            ),
        ).toBe(
            `translate(11 13.5) rotate(60) scale(1.5 1.5)`,
            // Note: Skew will be available in the future> skew(60deg,90deg)
        );

        // TODO: more
    });
});
