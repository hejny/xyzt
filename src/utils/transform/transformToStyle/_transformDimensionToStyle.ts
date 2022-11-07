import { showValueWithUnit } from '../../showValueWithUnit';
import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';

export function _transformDimensionToStyle(
    styleFormat: Pick<ITransformStyleFormat, 'dimensionUnit' | 'fractionDigits'>,
    value: number,
): string {
    return showValueWithUnit(styleFormat.dimensionUnit, styleFormat.fractionDigits, value);
}
