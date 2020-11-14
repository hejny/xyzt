import { Transform } from '../../../classes/Transform';
import { transformFromStyle } from '../transformFromStyle/transformFromStyle';
import { transformToStyleCss } from '../transformToStyle/transformToStyleCss';

export function applyTransformOnSvgElement(
    transform: Transform,
    element: SVGGElement,
) {
    element.setAttribute(
        'transform',
        transformToStyleCss(
            Transform.combine(
                transformFromStyle(element.getAttribute('transform') || ''),
                transform,
            ),
        ),
    );
}
