import { Transform } from '../../../classes/Transform';
import { ITransform } from '../../../interfaces/ITransform';
import { transformFromStyle } from '../transformFromStyle/transformFromStyle';
import { transformToStyleSvg } from '../transformToStyle/transformToStyleSvg';

export function applyTransformOnSvgElement(transform: ITransform, element: SVGGElement) {
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
