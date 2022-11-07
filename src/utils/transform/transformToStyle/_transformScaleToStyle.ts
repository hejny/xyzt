import { Vector } from '../../../classes/Vector';
import { showValue } from '../../showValue';
import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';

export function _transformScaleToStyle(styleFormat: ITransformStyleFormat, scale: Vector): string | null {
    if (Vector.isEqual(scale, Vector.square()) || Vector.isEqual(scale, Vector.cube())) {
        return null;
    }
    const { x, y } = scale;
    return `scale(${showValue(styleFormat.fractionDigits, x)}${styleFormat.valuesDelimiter}${showValue(
        styleFormat.fractionDigits,
        y,
    )})`;
}
