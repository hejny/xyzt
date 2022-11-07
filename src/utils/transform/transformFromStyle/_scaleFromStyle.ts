import { Vector } from '../../../classes/Vector';
import { extractValuesFromStyle } from '../../extractValuesFromStyle';

export function _scaleFromStyle(cssTransform: string): Vector | null {
    const values = extractValuesFromStyle('scale', cssTransform);
    if (!values) {
        return null;
    }
    return Vector.fromArray(...values.map(({ value }) => value).slice(0, 2), 1);
}
