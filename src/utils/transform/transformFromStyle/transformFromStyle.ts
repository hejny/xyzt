import { Transform } from '../../../classes/Transform';
import { ITransformData } from '../../../interfaces/ITransformData';
import { _rotateFromStyle } from './_rotateFromStyle';
import { _scaleFromStyle } from './_scaleFromStyle';
import { _translateFromStyle } from './_translateFromStyle';

/**
 * Converts css style.transform or svg transform to Transform object
 * Note: This function has a bit different philosophy than transformToStyle because it is trying to extract a Transform from the style in any format and you do not need to declare which format is it.
 */
export function transformFromStyle(cssTransform: string): Transform {
    const translate = _translateFromStyle(cssTransform);
    const rotate = _rotateFromStyle(cssTransform);
    const scale = _scaleFromStyle(cssTransform);

    const transform: ITransformData = {};

    if (translate) {
        transform.translate = translate;
    }
    if (rotate) {
        transform.rotate = rotate;
    }
    if (scale) {
        transform.scale = scale;
    }

    return Transform.fromObject(transform);

    // TODO: compatibility mode for other css transform directives as matrix, scaleX, scaleY, etc.
}
