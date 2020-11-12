import { Transform } from '../classes/Transform';
import { Vector } from '../classes/Vector';

export function transformToStyle(transform: Transform): string {
    const { translate, rotate, scale } = transform;
    return [
        transformTranslateToStyle(translate),
        transformRotateToStyle(rotate),
        transformScaleToStyle(scale),
    ]
        .filter((_) => _ !== null)
        .join(' ');
}

function transformTranslateToStyle(translate: Vector): string | null {
    if (Vector.isZero(translate)) {
        return null;
    }
    const { x, y } = translate;
    return `translate(${x.toFixed(0)}px,${y.toFixed(0)}px)`;
}

function transformRotateToStyle(rotate: Vector): string | null {
    const { z } = rotate;
    if (!z) {
        return null;
    }
    // Note: The strange way how I use % is due to stupid JavaScript modulo bug.
    return `rotate(${(((((z / Math.PI) * 180) % 360) + 360) % 360).toFixed(
        0,
    )}deg)`;
}

function transformScaleToStyle(scale: Vector): string | null {
    if (Vector.isEqual(scale, Vector.one())) {
        return null;
    }
    const { x, y } = scale;
    return `scale(${x.toFixed(3)},${y.toFixed(3)})`;
}

/*
Note: Skew will be available in the future
function transformSkewToCss(skew: Vector): string | null {
    if (!Vector.isZero(skew)) {
        const { x, y } = skew;
        return `translate(${x.toFixed(2)}deg,${x.toFixed(2)}deg)`;
    } else {
        return null;
    }
}
*/
