import { ε } from '../config';
import { IBoundingBox } from '../interfaces/IBoundingBox';
import { ITransform } from '../interfaces/ITransform';
import { AXES, IVector } from '../interfaces/IVector';
import { Transform } from './Transform';
import { Vector } from './Vector';

export class BoundingBox implements IBoundingBox {
    public static cube(): BoundingBox {
        return new BoundingBox(Transform.neutral());
    }

    // TODO: Maybe square

    public static fromTransform(transform: ITransform): BoundingBox {
        return new BoundingBox(Transform.fromObject(transform));
    }

    /* TODO:
    public static fromPoints(...points: IVector[]): BoundingBox {
        const vectorMin: IVector = {};
        const vectorMax: IVector = {};
        for (const point of points) {
            for (const axis of AXES) {
                if (vectorMin[axis] === undefined || (point[axis] !== undefined && vectorMin[axis]! > point[axis]!)) {
                    vectorMin[axis] = point[axis];
                }
                if (vectorMax[axis] === undefined || (point[axis] !== undefined && vectorMax[axis]! < point[axis]!)) {
                    vectorMax[axis] = point[axis];
                }
            }
        }
        return BoundingBox.fromTwoPoints([vectorMin, vectorMax]);
    }
    */

    /* TODO:
    public static fromTwoPoints([vectorA, vectorB]: [IVector, IVector]): BoundingBox {
        // TODO: param rotation

        const a = Vector.fromObject(vectorA);
        const b = Vector.fromObject(vectorB);

        const translate = new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y));
        const scale = Vector.subtract(a, b).map(Math.abs);

        return BoundingBox.fromTransform({ translate, scale });
    }
    */

    protected constructor(public transform: Transform) {}

    // TODO: circumscribed
    /*
    TODO:
    public clone() {
        return new BoundingBox(this.center, this.size, this.rotation);
    }

    public cloneDeep() {
        return new BoundingBox(
            this.center.clone(),
            this.size.clone(),
            this.rotation,
        );
    }
    */

    public get center(): Vector {
        return this.transform.translate;
    }

    public get topLeft(): Vector {
        return this.corner2D({ x: -0.5, y: 0.5 });
    }

    public get topRight(): Vector {
        return this.corner2D({ x: 0.5, y: 0.5 });
    }

    public get bottomLeft(): Vector {
        return this.corner2D({ x: -0.5, y: -0.5 });
    }

    public get bottomRight(): Vector {
        return this.corner2D({ x: 0.5, y: -0.5 });
    }

    // TODO: Also 3D versions

    // TODO: setters

    public intersects(position: Vector): boolean {
        const positionTransformed = position.apply(this.transform.inverse());

        // Note: This stupidity is here because javascript is sometimes not precise in the last decimal digit
        const bound = 0.5 + ε;

        return (
            -bound <= positionTransformed.x &&
            -bound <= positionTransformed.y &&
            bound >= positionTransformed.x &&
            bound >= positionTransformed.y
        );
    }

    // !! TODO: intersects for another BoundingBox

    public applyTransform(transform: ITransform) {
        // TODO: Same pattern as Vector and Transform
        // TODO: Immutable
        this.transform = this.transform.apply(Transform.fromObject(transform));
    }

    private corner2D(relativePosition: IVector): Vector {
        return this.center
            .within(this.transform.pick('rotate', 'scale'), (t) => t.add(relativePosition))
            .stripInfatesimals();
    }
}
