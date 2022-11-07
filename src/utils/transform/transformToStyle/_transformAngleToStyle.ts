import { convertAngle } from '../../convertAngle';
import { showValueWithUnit } from '../../showValueWithUnit';
import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';

export function _transformAngleToStyle(
    styleFormat: Pick<ITransformStyleFormat, 'angleUnit' | 'fractionDigits'>,
    value: number,
): string {
    return showValueWithUnit(
        styleFormat.angleUnit,
        styleFormat.fractionDigits,
        convertAngle('rad', styleFormat.angleUnit, value),
    );
}
