import { Transform } from '../../../classes/Transform';
import { transformToStyleSvg } from '../../../main';
import { transformFromStyle } from '../transformFromStyle/transformFromStyle';

export function applyTransformOnSvgElement(
    transform: Transform,
    element: SVGGElement,
) {
    element.setAttribute(
        'transform',
        transformToStyleSvg(
            Transform.combine(
                transformFromStyle(element.getAttribute('transform') || ''),
                transform,
            ),
        ),
    );
}
