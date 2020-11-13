import { IAngleUnit } from './transform/styleFormat/ITransformStyleFormat';

export function fullAngle(unit: IAngleUnit): number {
    switch (unit) {
        case '(rad)':
        case 'rad':
            return Math.PI * 2;
        case '(deg)':
        case 'deg':
            return 360;
        case 'grad':
            return 400;
        case 'turn':
            return 1;
    }
}
