import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';
import { transformFromCss } from '../src/utils/transformFromCss';

describe('transformFromCss', () => {
    /*
    TODO: 
    it('throws on broken css strings', () => {
        expect(() => transformFromCss(`woooo`)).toThrowError();
        expect(() => transformFromCss(`hello(15px,5px)`)).toThrowError();
    });
    */

    it('is working with complex css transform ', () => {
        expect(
            transformFromCss(
                // Note: random whitespaces are here intentionally to test that also non canonical form can be parsed
                `translate(11px, 13px)     rotate( 60deg ) scale( 1.5 , 1.5 )`,
            ),
        ).toEqual(
            Transform.fromObject({
                translate: Vector.fromArray(11, 13),
                rotate: Math.PI / 3,
                scale: Vector.fromArray(1.5, 1.5, 1),
            }),
        );
    });

    // TODO: compatibility mode for other css transform directives as matrix, scaleX, scaleY, etc.
});
