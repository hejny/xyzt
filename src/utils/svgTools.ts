import { Transformation } from '../Transformation';
import { Vector } from '../Vector';

const TRANSFORM = /\w*\([^)]*\)/g;
const TRANSLATE = /^translate\(\s*(\-?\d*\.?\d+(e\-?\d*\.?\d+)?)\s*,?\s*(\-?\d*\.?\d+(e\-?\d*\.?\d+)?)\s*\)$/g;
const ROTATE = /^rotate\(\s*(\-?\d*\.?\d+(e\-?\d*\.?\d+)?)\s*,?\s*(\-?\d*\.?\d+(e\-?\d*\.?\d+)?)\s*,?\s*(\-?\d*\.?\d+(e\-?\d*\.?\d+)?)\s*\)$/g;
const SCALE = /^scale\(\s*(\-?\d*\.?\d+(e\-?\d*\.?\d+)?)\s*,?\s*(\-?\d*\.?\d+(e\-?\d*\.?\d+)?)\s*\)$/g;

// TODO: is (\-?\d*\.?\d+) correct for number?
// TODO: rotate(1.00342672343173e-7,0,0)

export function svgTransformationDecode(
    transform: string = '',
): Transformation {
    const transformation = Transformation.Neutral();

    TRANSFORM.lastIndex = 0;
    const transforms: string[] = [];
    let execPart: RegExpExecArray | null = null;

    // tslint:disable-next-line
    while ((execPart = TRANSFORM.exec(transform))) {
        transforms.push(execPart[0]);
    }

    if (!transforms) {
        // tslint:disable-next-line
        console.warn(`Can not decode svg transform "${transform}".`);
        return Transformation.Neutral();
    }

    // console.log('transform => transforms',transform,transforms);

    transforms.map((part) => {
        TRANSLATE.lastIndex = 0;
        ROTATE.lastIndex = 0;

        if (TRANSLATE.test(part)) {
            // console.log(part, TRANSLATE);
            // console.log(part.match(TRANSLATE));
            // onsole.log(TRANSLATE.exec(part));

            TRANSLATE.lastIndex = 0;
            const [, /*full*/ x /*xe*/, , y /*ye*/] = TRANSLATE.exec(
                part,
            )!.map((n) => parseFloat(n));

            transformation.translate = new Vector(x, y);
        } else if (ROTATE.test(part)) {
            // console.log(ROTATE.exec(part));

            ROTATE.lastIndex = 0;
            const [
                ,
                /*full*/ angleDegrees /*ade*/,
                ,
                x /*xe*/,
                ,
                y /*ye*/,
            ] = ROTATE.exec(part)!.map((n) => parseFloat(n));

            // console.log(full, angleDegrees, ade, x, xe, y, ye);

            transformation.rotate = (angleDegrees / 180) * Math.PI;
            transformation.rotateCenter = new Vector(x, y);
        } else if (SCALE.test(part)) {
            /* todo
            SCALE.lastIndex = 0;
            console.log(SCALE.exec(part)!);

            SCALE.lastIndex = 0;
            const [full, x, xe, y, ye] = SCALE.exec(part)!.map((n) =>
                parseFloat(n),
            );
            full;
            xe;
            y;
            ye;

            //console.log([full, x, xe, y, ye]);

            transformation.scale = x;// TODO: y is not saved
            */
        } else {
            // tslint:disable-next-line
            console.warn(
                `Unknown part of svg transform "${part}".`,
                TRANSLATE.test(part),
                ROTATE.test(part),
            );
        }
    });

    return transformation;
}

export function svgTransformationEncode(
    transformation: Transformation,
): string {
    const { translate, rotate, rotateCenter /*, scale*/ } = transformation;
    return `translate(${translate.x} ${translate.y}) rotate(${(rotate /
        Math.PI) *
        180} ${rotateCenter.x} ${rotateCenter.y})`; // TODO: is it better with spaces or colons?
    // TODO: scale(${scale} ${scale})
}
