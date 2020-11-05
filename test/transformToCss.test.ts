import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';
import { transformToCss } from '../src/utils/transformToCss';

describe('transformToCss', () => {
    it('is working with neutral transforms which should results in empty css strings', () => {
        expect(transformToCss(Transform.fromObject({}))).toBe(``);
        expect(
            transformToCss(Transform.fromObject({ translate: Vector.zero() })),
        ).toBe(``);
        expect(transformToCss(Transform.fromObject({ rotate: 0 }))).toBe(``);
        expect(
            transformToCss(Transform.fromObject({ rotate: Vector.zero() })),
        ).toBe(``);
        expect(transformToCss(Transform.fromObject({ scale: 1 }))).toBe(``);
        expect(
            transformToCss(Transform.fromObject({ scale: Vector.one() })),
        ).toBe(``);

        /* Note: Skew will be available in the future
        expect(
            transformToCss(Transform.fromObject({ skew: Vector.zero() })),
        ).toBe(``);
        */

        expect(
            transformToCss(
                Transform.fromObject({
                    translate: Vector.zero(),
                    rotate: 0,
                    scale: 1,
                    // Note: Skew will be available in the future> skew: Vector.zero(),
                }),
            ),
        ).toBe(``);
    });

    it('is working with translate', () => {
        expect(
            transformToCss(
                Transform.fromObject({ translate: Vector.fromArray(10, 15) }),
            ),
        ).toBe(`translate(10px,15px)`);
    });

    it('is working with rotate', () => {
        expect(transformToCss(Transform.fromObject({ rotate: Math.PI }))).toBe(
            `rotate(180deg)`,
        );
        expect(
            transformToCss(Transform.fromObject({ rotate: Math.PI * 3 })),
        ).toBe(`rotate(180deg)`);
        expect(transformToCss(Transform.fromObject({ rotate: -Math.PI }))).toBe(
            `rotate(180deg)`,
        );
        expect(
            transformToCss(
                Transform.fromObject({ rotate: Vector.fromArray(1, 2, 0) }),
            ),
        ).toBe(``);
    });

    /*
    it('is working with scale', () => {
         // TODO: Test scale
        expect(transformToCss(Transform.fromObject({ scale: 1 }))).toBe(
            `rotate(180deg)`,
        );
    });

    it('is working with skew', () => {
        // TODO: Test skew
    });
    */

    it('is working with complex Transforms ', () => {
        expect(
            transformToCss(
                Transform.fromObject({
                    translate: Vector.fromArray(11, 13, 17),
                    rotate: Math.PI / 3,
                    scale: 1.5,
                    // Note: Skew will be available in the future> skew: Vector.fromArray(Math.PI / 3, Math.PI / 2),
                }),
            ),
        ).toBe(
            `translate(11px,13px) rotate(60deg) scale(1.500,1.500)`,
            // Note: Skew will be available in the future> skew(60deg,90deg)
        );

        // TODO: more
    });
});
