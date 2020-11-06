import { IBoundingBox } from '../interfaces/IBoundingBox';
import { ITransform } from '../interfaces/ITransform';
import { Transform } from './Transform';
import { Vector } from './Vector';

export class BoundingBox implements IBoundingBox {
    public static neutral(): BoundingBox {
        return new BoundingBox(Transform.neutral());
    }

    public static fromTransform(transform: ITransform): BoundingBox {
        return new BoundingBox(Transform.fromObject(transform));
    }

    private constructor(public transform: Transform) {}

    public get center(): Vector {
        // TODO: Rotate
        return this.transform.translate.add(this.transform.scale.half());
    }

    // TODO: Other corners

    public applyTransform(transform: ITransform) {
        this.transform = Transform.combine(this.transform, transform);
    }
}
