import { Vector } from '../../../classes/Vector';
import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';
import { _transformDimensionToStyle } from './_transformDimensionToStyle';

export function _transformTranslateToStyle(
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
