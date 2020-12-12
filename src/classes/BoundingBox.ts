import { IBoundingBox } from '../interfaces/IBoundingBox';
import { ITransform } from '../interfaces/ITransform';
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

    /*
    TODO: Do after tests
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
    */

    public get size(): Vector {
        return this.transform.scale;
    }

    public get rotation(): Vector {
        return this.transform.rotate;
    }

    // TODO: setters

    public intersects(position: Vector): boolean {
        const positionTransformed = position.apply(this.transform.inverse());

        // Note: This stupidity is here because javascript is sometimes not precise in the last decimal digit
        const bound = 0.5 + 0.0000000000000002;

        return (
            -bound <= positionTransformed.x &&
            -bound <= positionTransformed.y &&
            bound >= positionTransformed.x &&
            bound >= positionTransformed.y
        );
    }

    public applyTransform(transform: ITransform) {
        // TODO: Same pattern as Vector and Transform
        // TODO: Immutable
        this.transform = this.transform.apply(Transform.fromObject(transform));
    }

    /*
    TODO: Do after tests
    private corner(relativePosition: IVector) {
        return this.center
        .apply(this.transform.pick('rotate','scale'))
            .add(this.size.multiply(relativePosition))
            .apply(this.transform.pick('translate'));
    }
    */
}
