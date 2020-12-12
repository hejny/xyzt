import { ITransform } from '../../../interfaces/ITransform';
import { applyTransformOnHtmlElement } from './applyTransformOnHtmlElement';
import { applyTransformOnSvgElement } from './applyTransformOnSvgElement';

export function applyTransformOnElement(transform: ITransform, element: Element) {
    // TODO: Try to preserve options of the transform (with function transformFormatFromStyle)

    switch (element.tagName) {
        // TODO: Probbably better recognition between SVGGElement vs HTMLElement
        case 'g':
            applyTransformOnSvgElement(transform, element as SVGGElement);
            break;
        default:
            applyTransformOnHtmlElement(transform, element as HTMLElement);
    }
}
