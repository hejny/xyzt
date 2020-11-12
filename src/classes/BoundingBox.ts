import { IBoundingBox } from "../interfaces/IBoundingBox";
import { ITransform } from "../interfaces/ITransform";
import { Transform } from "./Transform";
import { Vector } from "./Vector";

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
        return this.center
            .add(this.size.multiply({x:-.5,y:-.5}))
            .rotate(this.rotation.z, this.center);
    }

    /*
    public set topLeft(value: Vector) {
        this.center = this.center.add(value.subtract(this.topLeft));
    }
    */

    public get topRight() {
        return this.center
        .add(this.size.multiply({x:.5,y:-.5}))
        .rotate(this.rotation.z, this.center);
    }

    public get bottomLeft() {
        return this.center
        .add(this.size.multiply({x:-.5,y:.5}))
        .rotate(this.rotation.z, this.center);
    }

    public get bottomRight() {
        return this.center
        .add(this.size.multiply({x:.5,y:.5}))
        .rotate(this.rotation.z, this.center);
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
        const position1r = this.center;
        const position2r = position.rotate(-this.rotation.z, this.center);

        return (
            position1r.x - this.size.x / 2 <= position2r.x &&
            position1r.y - this.size.y / 2 <= position2r.y &&
            position1r.x + this.size.x / 2 >= position2r.x &&
            position1r.y + this.size.y / 2 >= position2r.y
        );
    }

    public applyTransform(transform: ITransform) {
        // TODO: Immutable
        this.transform = Transform.combine(this.transform, transform);
    }
}
