import { Transform } from '../../../classes/Transform';
import { ITransformData } from '../../../interfaces/ITransformData';
import { transformFromStyle } from '../transformFromStyle/transformFromStyle';
import { transformToStyleSvg } from '../transformToStyle/transformToStyleSvg';

export function applyTransformOnSvgElement(transform: ITransformData, element: SVGGElement) {
    element.setAttribute(
        'transform',
        transformToStyleSvg(
            Transform.apply(
                transformFromStyle(element.getAttribute('transform') || ''),
                Transform.fromObject(transform),
            ),
        ),
    );
}
