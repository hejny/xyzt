import { ε } from '../config';
import { IBoundingBox } from '../interfaces/IBoundingBox';
import { ITransformData } from '../interfaces/ITransformData';
import { AXES, IVector } from '../interfaces/IVectorData';
import { ArrayFull, ArrayFull2 } from '../interfaces/typeHelpers';
import { Transform } from './Transform';
import { Vector } from './Vector';

export class BoundingBox implements IBoundingBox {
    public static cube(): BoundingBox {
        return new BoundingBox(Transform.neutral());
    }

    // TODO: Maybe square

    public static fromTransform(transform: ITransformData): BoundingBox {
        return new BoundingBox(Transform.fromObject(transform));
    }

    public static fromDomRect(domRect: { height: number; width: number; x: number; y: number }): BoundingBox {
        const { x, y, width, height } = domRect;
        return BoundingBox.fromPoints(new Vector(x, y), new Vector(x + width, y + height));
    }

    public static merge(...boundingBoxes: ArrayFull<BoundingBox>): BoundingBox {
        return BoundingBox.fromPoints(
            ...(boundingBoxes.flatMap((boundingBox) => [boundingBox.topLeft, boundingBox.bottomRight]) as any),
        );
    }

    public static fromPoints(...points: ArrayFull2<IVector>): BoundingBox {
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

        const a = Vector.fromObject(vectorMin);
        const b = Vector.fromObject(vectorMax);

        const translate = Vector.add(a, b).half();
        const scale = b.subtract(a);

        return BoundingBox.fromTransform({ translate, scale });
    }

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

    /**
     * Get size of the bounding box
     */
    public get size(): Vector {
        return this.transform.scale;
    }

    /**
     * Get width of the bounding box
     */
    public get width(): number {
        return this.transform.scale.x;
    }

    /**
     * Get width of the bounding box
     */
    public get height(): number {
        return this.transform.scale.y;
    }

    /**
     * Get rotation of the bounding box
     */
    public get rotation(): number {
        return this.transform.rotate.z;
    }

    /**
     * Get center point of the bounding box
     */
    public get center(): Vector {
        return this.transform.translate;
    }

    /**
     * Get top-left point of the bounding box
     *
     * 🟥🟦
     * 🟦🟦
     */
    public get topLeft(): Vector {
        return this.corner2D({ x: -0.5, y: -0.5 });
    }

    /**
     * Get top-right point of the bounding box
     *
     * 🟦🟥
     * 🟦🟦
     */
    public get topRight(): Vector {
        return this.corner2D({ x: 0.5, y: -0.5 });
    }

    /**
     * Get bottom-left point of the bounding box
     *
     * 🟦🟦
     * 🟥🟦
     */
    public get bottomLeft(): Vector {
        return this.corner2D({ x: -0.5, y: 0.5 });
    }

    /**
     * Get bottom-right point of the bounding box
     *
     * 🟦🟦
     * 🟦🟥
     */
    public get bottomRight(): Vector {
        return this.corner2D({ x: 0.5, y: 0.5 });
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

    // TODO: !! TODO: intersects for another BoundingBox

    public applyTransform(transform: ITransformData) {
        // TODO: Same pattern as Vector and Transform
        // TODO: Immutable
        this.transform = this.transform.apply(Transform.fromObject(transform));
    }

    private corner2D(relativePosition: IVector): Vector {
        return (
            this.center
                .add(this.transform.scale.multiply(relativePosition))
                // TODO: 🔼 Also consider rotation; originally used broken: .within(this.transform.pick('rotate', 'scale'), (center) => center.add(relativePosition))
                .stripInfatesimals()
        );
    }

    public toString() {
        // TODO: Better
        return JSON.stringify(Transform.toJSON(this.transform));
    }
}
