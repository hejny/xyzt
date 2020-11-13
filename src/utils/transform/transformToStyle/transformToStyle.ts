import { Transform } from '../../../classes/Transform';
import { Vector } from '../../../classes/Vector';
import { convertAngle } from '../../convertAngle';
import { showValue } from '../../showValue';
import { showValueWithUnit } from '../../showValueWithUnit';
import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';

export function transformToStyle(
    styleFormat: ITransformStyleFormat,
    transform: Transform,
): string {
    const { translate, rotate, scale } = transform;
    return [
        _transformTranslateToStyle(styleFormat, translate),
        _transformRotateToStyle(styleFormat, rotate),
        _transformScaleToStyle(styleFormat, scale),
    ]
        .filter((_) => _ !== null)
        .join(' ');
}

function _transformDimensionToStyle(
    styleFormat: Pick<
        ITransformStyleFormat,
        'dimensionUnit' | 'fractionDigits'
    >,
    value: number,
): string {
    return showValueWithUnit(
        styleFormat.dimensionUnit,
        styleFormat.fractionDigits,
        value,
    );
}

function _transformAngleToStyle(
    styleFormat: Pick<ITransformStyleFormat, 'angleUnit' | 'fractionDigits'>,
    value: number,
): string {
    return showValueWithUnit(
        styleFormat.angleUnit,
        styleFormat.fractionDigits,
        convertAngle('rad', styleFormat.angleUnit, value),
    );
}

function _transformTranslateToStyle(
    styleFormat: ITransformStyleFormat,
    translate: Vector,
): string | null {
    if (Vector.isZero(translate)) {
        return null;
    }
    const { x, y } = translate;
    return `translate(${_transformDimensionToStyle(styleFormat, x)}${
        styleFormat.valuesDelimiter
    }${_transformDimensionToStyle(styleFormat, y)})`;
}

function _transformRotateToStyle(
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

function _transformScaleToStyle(
    styleFormat: ITransformStyleFormat,
    scale: Vector,
): string | null {
    if (Vector.isEqual(scale, Vector.one())) {
        return null;
    }
    const { x, y } = scale;
    return `scale(${showValue(styleFormat.fractionDigits, x)}${
        styleFormat.valuesDelimiter
    }${showValue(styleFormat.fractionDigits, y)})`;
}

/*
Note: Skew will be available in the future
function transformSkewToCss(skew: Vector): string | null {
    if (!Vector.isZero(skew)) {
        const { x, y } = skew;
        return `translate(${x.toFixed(2)}deg,${x.toFixed(2)}deg)`;
    } else {
        return null;
    }
}
*/
