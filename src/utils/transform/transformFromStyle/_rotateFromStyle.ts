import { convertAngle } from '../../convertAngle';
import { extractValuesFromStyle } from '../../extractValuesFromStyle';
import { IAngleUnit } from '../styleFormat/ITransformStyleFormat';

export function _rotateFromStyle(cssTransform: string): number | null {
    const values = extractValuesFromStyle('rotate', cssTransform);
    if (!values) {
        return null;
    }
    return convertAngle(
        (values[0].unit as IAngleUnit) || '(deg)',
        '(rad)',
        values[0].value
    );
}
