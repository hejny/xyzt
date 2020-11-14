import { transformFromStyle } from '../src/utils/transform/transformFromStyle/transformFromStyle';
import { transformToStyleCss } from '../src/utils/transform/transformToStyle/transformToStyleCss';


describe('Conversion of Transform object to CSS', () => {



    it('is working with empty CSS transformation', () => {
        (expect(
            transformToStyleCss(
            transformFromStyle(
                ``,
            )),
        ) ).toBe(
            ``
        );
    });

    
    it('is working with z deg CSS rotate ', () => {
        (expect(
            transformToStyleCss(
            transformFromStyle(
                `rotate(60deg)`,
            )),
        ) ).toBe(
            `rotate(60deg)`
        );
    });

    
    it('is working with z grad CSS rotate ', () => {
        (expect(
            transformToStyleCss(
            transformFromStyle(
                `rotate(100grad)`,
            )),
        ) ).toBe(
            `rotate(90deg)`
        );
    });

    it('is working with z rad CSS rotate ', () => {
        (expect(
            transformToStyleCss(
            transformFromStyle(
                `rotate(${Math.PI/3}rad)`,
            )),
        ) ).toBe(
            `rotate(60deg)`
        );
    });

    it('is working with z turn CSS rotate ', () => {
        (expect(
            transformToStyleCss(
            transformFromStyle(
                `rotate(-0.75turn)`,
            )),
        ) ).toBe(
            `rotate(90deg)`
        );
    });
    

    it('is working with complex CSS transform ', () => {
        (expect(
            transformToStyleCss(
            transformFromStyle(
                `translate(11px, 13.5px)     rotate( 60deg ) scale( 1.5 , 1.5 )`,
            )),
        ) ).toBe(
            `translate(11px,13.5px) rotate(60deg) scale(1.5,1.5)`
        );
    });

});
