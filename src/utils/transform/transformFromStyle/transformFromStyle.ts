import { Transform } from '../../../classes/Transform';
import { Vector } from '../../../classes/Vector';
import { ITransform } from '../../../interfaces/ITransform';
import { convertAngle } from '../../convertAngle';
import { extractValuesFromStyle } from '../../extractValuesFromStyle';
import { IAngleUnit } from '../styleFormat/ITransformStyleFormat';

/**
 * Converts css style.transform or svg transform to Transform object
 * Note: This function has a bit different philosophy than transformToStyle because it is trying to extract a Transform from the style in any format and you do not need to declare which format is it.
 */
export function transformFromStyle(cssTransform: string): Transform {

    const  translate= _translateFromStyle(cssTransform);
    const  rotate= _rotateFromStyle(cssTransform);
    const  scale= _scaleFromStyle(cssTransform);

    const transform: ITransform = {};

    if(translate){transform.translate = translate;}
    if(rotate){transform.rotate = rotate;}
    if(scale){transform.scale = scale;}

    return Transform.fromObject(transform);
}

function _translateFromStyle(cssTransform: string): Vector | null {
    const values = extractValuesFromStyle('translate', cssTransform);
    if (!values) {
        return null;
    }
    return Vector.fromArray(values.map(({ value }) => value).slice(0, 2));
}

function _rotateFromStyle(cssTransform: string): number | null {
    const values = extractValuesFromStyle('rotate', cssTransform);
    if (!values) {
        return null;
    }
    return convertAngle(
        (values[0].unit as IAngleUnit) || '(deg)',
        '(rad)',
        values[0].value,
    );
}

function _scaleFromStyle(cssTransform: string): Vector | null {
    const values = extractValuesFromStyle('scale', cssTransform);
    if (!values) {
        return null;
    }
    return Vector.fromArray(...values.map(({ value }) => value).slice(0, 2), 1);
}

// TODO: compatibility mode for other css transform directives as matrix, scaleX, scaleY, etc.
