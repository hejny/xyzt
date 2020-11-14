import { Transform } from '../../../classes/Transform';
import { transformFromStyle } from '../transformFromStyle/transformFromStyle';
import { transformToStyleCss } from '../transformToStyle/transformToStyleCss';

export function applyTransformOnHtmlElement(
    transform: Transform,
    element: HTMLElement,
) {
    element.style.transform = transformToStyleCss(
        Transform.combine(
            transformFromStyle(element.style.transform),
            transform,
        ),
    );
}
