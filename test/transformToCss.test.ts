import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';
import { transformToStyleCss } from '../src/utils/transform/transformToStyle/transformToStyleCss';

describe('Conversion of CSS style attribute transform to Transform object', () => {
    it('is working with neutral transforms which should results in empty css strings', () => {
        expect(transformToStyleCss(Transform.fromObject({}))).toBe(``);
        expect(
            transformToStyleCss(
                Transform.fromObject({ translate: Vector.zero() }),
            ),
        ).toBe(``);
        expect(transformToStyleCss(Transform.fromObject({ rotate: 0 }))).toBe(
            ``,
        );
        expect(
            transformToStyleCss(
                Transform.fromObject({ rotate: Vector.zero() }),
            ),
        ).toBe(``);
        expect(transformToStyleCss(Transform.fromObject({ scale: 1 }))).toBe(
            ``,
        );
        expect(
            transformToStyleCss(
                Transform.fromObject({ scale: Vector.square() }),
            ),
        ).toBe(``);
        expect(
            transformToStyleCss(Transform.fromObject({ scale: Vector.cube() })),
        ).toBe(``);

        /* Note: Skew will be available in the future
        expect(
            transformToStyleCss(Transform.fromObject({ skew: Vector.zero() })),
        ).toBe(``);
        */

        expect(
            transformToStyleCss(
                Transform.fromObject({
                    translate: Vector.zero(),
                    rotate: 0,
                    scale: 1,
                    // Note: Skew will be available in the future> skew: Vector.zero(),
                }),
            ),
        ).toBe(``);
    });

    it('is working with translate to CSS ', () => {
        expect(
            transformToStyleCss(
                Transform.fromObject({ translate: Vector.fromArray(10, 15) }),
            ),
        ).toBe(`translate(10px,15px)`);
    });

    it('is working with rotate to CSS ', () => {
        expect(
            transformToStyleCss(Transform.fromObject({ rotate: Math.PI })),
        ).toBe(`rotate(180deg)`);
        expect(
            transformToStyleCss(Transform.fromObject({ rotate: Math.PI * 3 })),
        ).toBe(`rotate(180deg)`);
        expect(
            transformToStyleCss(Transform.fromObject({ rotate: -Math.PI })),
        ).toBe(`rotate(180deg)`);
        expect(
            transformToStyleCss(
                Transform.fromObject({ rotate: Vector.fromArray(1, 2, 0) }),
            ),
        ).toBe(``);
    });

    /*
    it('is working with scale', () => {
         // TODO: Test scale
        expect(transformToStyleCss(Transform.fromObject({ scale: 1 }))).toBe(
            `rotate(180deg)`,
        );
    });

    it('is working with skew', () => {
        // TODO: Test skew
    });
    */

    it('is working with complex Transforms to CSS ', () => {
        expect(
            transformToStyleCss(
                Transform.fromObject({
                    translate: Vector.fromArray(11, 13, 17),
                    rotate: Math.PI / 3,
                    scale: 1.5,
                    // Note: Skew will be available in the future> skew: Vector.fromArray(Math.PI / 3, Math.PI / 2),
                }),
            ),
        ).toBe(
            `translate(11px,13px) rotate(60deg) scale(1.5,1.5)`,
            // Note: Skew will be available in the future> skew(60deg,90deg)
        );

        // TODO: more
    });
});
