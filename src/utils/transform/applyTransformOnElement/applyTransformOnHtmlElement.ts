import { Transform } from '../../../classes/Transform';
import { ITransform } from '../../../interfaces/ITransform';
import { transformFromStyle } from '../transformFromStyle/transformFromStyle';
import { transformToStyleCss } from '../transformToStyle/transformToStyleCss';

export function applyTransformOnHtmlElement(
    transform: ITransform,
    element: HTMLElement,
) {
    element.style.transform = transformToStyleCss(
        Transform.apply(
            transformFromStyle(element.style.transform),
            Transform.fromObject(transform),
        ),
    );
}
