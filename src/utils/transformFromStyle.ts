import { Transform } from '../classes/Transform';
import { Vector } from '../classes/Vector';

export function transformFromStyle(cssTransform: string): Transform {
    return Transform.fromObject({
        translate: transformTranslateFromStyle(cssTransform),
        rotate: transformRotateFromStyle(cssTransform),
        scale: transformScaleFromStyle(cssTransform),
    });
}

function transformTranslateFromStyle(cssTransform: string): Vector | undefined {
    const match = /translate\(\s*(?<x>(\d+\.?\d*)(px|%)?)\s*,\s*(?<y>(\d+\.?\d*)(px|%)?)\s*\)/i.exec(
        cssTransform,
    );
    if (!match || !match.groups) {
        return undefined;
    }
    const { x, y } = match.groups;
    return Vector.fromArray(parseFloat(x), parseFloat(y));
}

function transformRotateFromStyle(cssTransform: string): number | undefined {
    const match = /rotate\(\s*(?<deg>(\d+\.?\d*))deg\s*\)/i.exec(cssTransform);
    if (!match || !match.groups) {
        return undefined;
    }
    const { deg } = match.groups;
    const rad = ((((parseFloat(deg) % 360) + 360) % 360) / 180) * Math.PI;
    return rad;
}

function transformScaleFromStyle(cssTransform: string): Vector | undefined {
    const match = /scale\(\s*(?<x>(\d+\.?\d*))\s*,\s*(?<y>(\d+\.?\d*))\s*\)/i.exec(
        cssTransform,
    );
    if (!match || !match.groups) {
        return undefined;
    }
    const { x, y } = match.groups;
    return Vector.fromArray(parseFloat(x), parseFloat(y), 1);
}

// TODO: compatibility mode for other css transform directives as matrix, scaleX, scaleY, etc.
