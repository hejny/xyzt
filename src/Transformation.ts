import {
    svgTransformationDecode,
    svgTransformationEncode,
} from './utils/svgTools';
import { Vector } from './Vector';

export class Transformation {
    public static Neutral(): Transformation {
        return new Transformation();
    }

    public static translate(translate: Vector): Transformation {
        return new Transformation(translate);
    }

    public static rotate(rotate: number): Transformation {
        return new Transformation(undefined, rotate);
    }

    public static scale(scale: number): Transformation {
        return new Transformation(undefined, undefined, undefined, scale);
    }

    constructor(
        public translate: Vector = Vector.Zero(),
        public rotate: number = 0,
        public rotateCenter: Vector = Vector.Zero(),
        public scale: number = 1,
    ) {}

    public clone(): Transformation {
        return new Transformation(
            this.translate,
            this.rotate,
            this.rotateCenter,
            this.scale,
        );
    }

    public cloneDeep(): Transformation {
        return new Transformation(
            this.translate.clone(),
            this.rotate,
            this.rotateCenter.clone(),
            this.scale,
        );
    }

    // TODO: in place methods
    public add(transformation: Transformation): Transformation {
        return new Transformation(
            this.translate.add(transformation.translate),
            (this.rotate + transformation.rotate) % (Math.PI * 2),
            this.rotateCenter.add(transformation.rotateCenter), // TODO: is it correct
            this.scale * transformation.scale,
        );
    }

    public subtract(transformation: Transformation): Transformation {
        return new Transformation(
            this.translate.subtract(transformation.translate),
            (this.rotate - transformation.rotate + Math.PI * 2) % (Math.PI * 2),
            this.rotateCenter.subtract(transformation.rotateCenter), // TODO: is it correct
            this.scale / transformation.scale,
        );
    }

    // TODO: maybe move to other function
    public applyOnElement(element: Element) {
        switch (element.tagName) {
            case 'g':
                this.applyOnSvgElement(element as SVGGElement);
                break;
            default:
                this.applyOnHtmlElement(element as HTMLElement);
        }
    }

    public applyOnHtmlElement(element: HTMLElement) {
        element.style.left =
            parseFloat(element.style.left || '0px') + this.translate.x + 'px'; // TODO: bounding box as default
        element.style.top =
            parseFloat(element.style.top || '0px') + this.translate.y + 'px';
    }

    public applyOnSvgElement(element: SVGGElement) {
        /*element.setAttribute(
            'transform',
            vectorToTranslate(
                translateToVector(
                    element.getAttribute('transform') || undefined,
                ).add(this.translate),
            ),
        );
        console.groupCollapsed('applyOnSvgElement');
        console.log('this',this);
        console.log('element',element);*/

        const transformationStringBefore =
            element.getAttribute('transform') || '';
        const transformationBefore = svgTransformationDecode(
            transformationStringBefore,
        );

        const transformationAfter = transformationBefore.add(this);
        const transformationStringAfter = svgTransformationEncode(
            transformationAfter,
        );

        element.setAttribute('transform', transformationStringAfter);

        /*
        console.log('transformationBefore',transformationBefore);
        console.log('transformationAfter',transformationAfter);

        console.log('transformationStringBefore',transformationStringBefore);
        console.log('transformationStringAfter',transformationStringAfter);

        console.log('check',element.getAttribute('transform'));


        console.groupEnd();
        */
    }
}

/*window.setImmediate(() => {
    const element = document.getElementsByTagName('g')[0];
    const transformation = Transformation.rotate(0.2);

    console.log('element', element);
    console.log('transformation', transformation);

    const interval = setInterval(() => {
        transformation.applyOnSvgElement(element);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
    }, 1000);
});
*/
