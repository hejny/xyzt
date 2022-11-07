import { Transform } from '../../../classes/Transform';
import { ITransformData } from '../../../interfaces/ITransformData';
import { transformFromStyle } from '../transformFromStyle/transformFromStyle';
import { transformToStyleCss } from '../transformToStyle/transformToStyleCss';

export function applyTransformOnHtmlElement(transform: ITransformData, element: HTMLElement) {
    element.style.transform = transformToStyleCss(
        Transform.apply(transformFromStyle(element.style.transform), Transform.fromObject(transform)),
    );
}
