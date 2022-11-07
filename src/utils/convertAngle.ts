import { fullAngle } from './fullAngle';
import { modulo } from './modulo';
import { IAngleUnit } from './transform/styleFormat/ITransformStyleFormat';

export function convertAngle(from: IAngleUnit, to: IAngleUnit, value: number): number {
    /*
    TODO: optimalizations with "(rad)" vs "rad"

    if (from === to) {
        return modulo(value, fullAngle(from));
    }
    */
    const fullFrom = fullAngle(from);
    const fullTo = fullAngle(to);
    return modulo((value / fullFrom) * fullTo, fullTo);
}
