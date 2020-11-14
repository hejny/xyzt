import { Vector } from '../../../classes/Vector';
import { extractValuesFromStyle } from '../../extractValuesFromStyle';

export function _translateFromStyle(cssTransform: string): Vector | null {
    const values = extractValuesFromStyle('translate', cssTransform);
    if (!values) {
        return null;
    }
    return Vector.fromArray(values.map(({ value }) => value).slice(0, 2));
}
