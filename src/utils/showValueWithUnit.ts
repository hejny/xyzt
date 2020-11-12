import { showValue } from './showValue';
import {
    IAngleUnit,
    IDimensionUnit,
} from './transform/styleFormat/ITransformStyleFormat';

export function showValueWithUnit(
    unit: IDimensionUnit | IAngleUnit,
    fractionDigits: number,
    value: number,
): string {
    return showValue(fractionDigits, value) + unit.replace(/^\(.*\)$/, '');
}
