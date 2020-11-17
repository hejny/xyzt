import { IBoundingBox } from '../interfaces/IBoundingBox';
import { ITransform } from '../interfaces/ITransform';
import { IVector } from '../main';
import { Transform } from './Transform';
import { Vector } from './Vector';

export class BoundingBox implements IBoundingBox {
    public static one(): BoundingBox {
        return new BoundingBox(Transform.neutral());
    }

    public static fromTransform(transform: ITransform): BoundingBox {
        return new BoundingBox(Transform.fromObject(transform));
    }

    protected constructor(public transform: Transform) {}

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

    public get topLeft() {
        return this.corner({ x: -0.5, y: -0.5 });
    }

    public get topRight() {
        return this.corner({ x: 0.5, y: -0.5 });
    }

    public get bottomLeft() {
        return this.corner({ x: -0.5, y: 0.5 });
    }

    public get bottomRight() {
        return this.corner({ x: 0.5, y: 0.5 });
    }

    // TODO: Other corners

    public get size(): Vector {
        return this.transform.scale;
    }

    public get rotation(): Vector {
        return this.transform.rotate;
    }

    // TODO: setters

    public intersects(position: Vector): boolean {
        const positionRotated = this.transform.applyOnPoint(position);

        return (
            this.center.x - this.size.x / 2 <= positionRotated.x &&
            this.center.y - this.size.y / 2 <= positionRotated.y &&
            this.center.x + this.size.x / 2 >= positionRotated.x &&
            this.center.y + this.size.y / 2 >= positionRotated.y
        );
    }

    public applyTransform(transform: ITransform) {
        // TODO: Immutable
        this.transform = Transform.combine(this.transform, transform);
    }

    private corner(relativePosition: IVector) {
        return this.transform.applyOnPoint(
            this.center.add(this.size.multiply(relativePosition)),
            this.center,
        );
    }
}
