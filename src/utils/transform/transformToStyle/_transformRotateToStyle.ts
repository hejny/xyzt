import { Vector } from '../../../classes/Vector';
import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';
import { _transformAngleToStyle } from './_transformAngleToStyle';

export function _transformRotateToStyle(
    styleFormat: ITransformStyleFormat,
    rotate: Vector,
): string | null {
    const { z } = rotate;
    if (!z) {
        return null;
    }
    // TODO: How about 3D rotation
    return `rotate(${_transformAngleToStyle(styleFormat, z)})`;
}
