import { Transform } from '../../../classes/Transform';
import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';
import { _transformRotateToStyle } from './_transformRotateToStyle';
import { _transformScaleToStyle } from './_transformScaleToStyle';
import { _transformTranslateToStyle } from './_transformTranslateToStyle';

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
