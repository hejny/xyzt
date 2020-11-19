import { ITransform } from '../interfaces/ITransform';
import {
    IAppliableOnTransform,
    ITransformApplyModifier,
} from '../interfaces/ITransformApplyModifier';
import { IVector } from '../interfaces/IVector';
import { IAppliableOnVector } from '../interfaces/IVectorApplyModifier';
import { convertAngle } from '../utils/convertAngle';
import { Vector } from './Vector';

export class Transform
    implements ITransform, IAppliableOnTransform, IAppliableOnVector {
    public static neutral(): Transform {
        return new Transform();
    }

    public static translate(translate: IVector): Transform {
        return Transform.fromObject({ translate });
    }

    public static rotate(
        rotate: number | IVector,
        center?: IVector,
    ): Transform {
        return Transform.fromObject({ rotate, center });
    }

    public static scale(scale: number | IVector, center?: IVector): Transform {
        return Transform.fromObject({ scale, center });
    }

    public static fromObject(transform: ITransform): Transform {
        if (transform instanceof Transform) {
            return transform;
        }
        return Transform.clone(transform);
    }

    // Note: Static methods bellow have instance equivalents

    public static clone(transform: ITransform): Transform {
        const optionsFull: Required<ITransform> = {
            ...Transform.neutral(),
            ...transform,
        };

        return new Transform(
            Vector.fromObject(optionsFull.translate),
            Vector.fromObject(optionsFull.center),
            (typeof optionsFull.rotate === 'number'
                ? Vector.fromArray(0, 0, optionsFull.rotate)
                : Vector.fromObject(optionsFull.rotate)
            ).map((angle) => convertAngle('(rad)', '(rad)', angle)),
            typeof optionsFull.scale === 'number'
                ? Vector.box(optionsFull.scale)
                : Vector.fromObject(optionsFull.scale),
            // Note: Skew will be available in the future>  Vector.fromObject(optionsFull.skew),
        );
    }

    public static cloneDeep(transform: ITransform): Transform {
        const transformFull = Transform.fromObject(transform);
        return new Transform(
            Vector.fromObject(transformFull.translate).clone(),
            Vector.fromObject(transformFull.center).clone(),
            Vector.fromObject(transformFull.rotate).clone(),
            Vector.fromObject(transformFull.scale).clone(),
            // Note: Skew will be available in the future>  Vector.fromObject(transformFull.skew).clone(),
        );
    }

    public static updateWithMutation(
        transform: ITransform,
        modifier: (Transform: Transform) => Transform | ITransform | void,
    ): Transform {
        const transformObject = Transform.clone(transform);
        const result = modifier(transformObject);

        if (result) {
            return Transform.fromObject(result);
        } else {
            return transformObject;
        }
    }

    // TODO: updateWithDeepMutation

    /**
     * @deprecated Maybe only use apply
     */
    public static combine(...transforms: ITransform[]): Transform {
        const transformsFull = transforms.map((transform) =>
            Transform.fromObject(transform),
        );
        return new Transform(
            transformsFull.reduce(
                (aggregated, { translate }) => aggregated.add(translate),
                Vector.zero(),
            ),
            transformsFull.reduce(
                (aggregated, { center }) => aggregated.add(center),
                Vector.zero(),
            ),
            transformsFull.reduce(
                (aggregated, { rotate }) => aggregated.add(rotate),
                // TODO:  % (Math.PI * 2)
                Vector.zero(),
            ),
            transformsFull.reduce(
                (aggregated, { scale }) => aggregated.multiply(scale),
                Vector.one(),
            ),
            /* Note: Skew will be available in the future>
            transformsFull.reduce(
                (aggregated, { skew }) =>
                    aggregated.add(/* TODO: Maybe multiply and one? * / skew),
                Vector.zero(),
            ),
            */
        );
    }

    public static apply(
        transform: ITransform,
        modifier: ITransformApplyModifier,
    ): Transform {
        if (typeof modifier === 'function') {
            return Transform.fromObject(
                modifier(Transform.fromObject(transform)),
            );
        } else {
            return Transform.fromObject(
                modifier.applyOnTransform(Transform.fromObject(transform)),
            );
        }
    }

    public static negate(transform: ITransform): Transform {
        const transformFull = Transform.fromObject(transform);
        return new Transform(
            transformFull.translate.negate(),
            transformFull.center,
            transformFull.rotate.negate(),
            transformFull.scale.inverse(),
            // Note: Skew will be available in the future> transformFull.skew.negate(),
        );
    }

    /**
     * @deprecated Maybe only use apply
     */
    public static subtract(
        transform1: ITransform,
        transform2: ITransform,
    ): Transform {
        return Transform.combine(transform1, Transform.negate(transform2));
    }

    // TODO: isEqual

    public static applyOnTransform(
        from: ITransform,
        to: ITransform,
    ): ITransform {
        const fromObject = Transform.fromObject(from);
        let toCentered = Transform.updateWithMutation(to, (t) => {
            t.translate = t.translate.subtract(fromObject.center);
        });

        // TODO: Make it work 3D
        // TODO: Optimize

        // Rotate
        toCentered.translate = toCentered.translate.rotate(fromObject.rotate);
        toCentered.rotate = Vector.add(toCentered.rotate, fromObject.rotate);

        // Scale
        toCentered.translate = toCentered.translate.multiply(fromObject.scale);
        toCentered.scale = Vector.multiply(toCentered.scale, fromObject.scale);

        // Translate
        toCentered.translate = toCentered.translate.add(fromObject.translate);

        return toCentered.updateWithMutation((t) => {
            t.translate = t.translate.add(fromObject.center);
        });
    }

    public static applyOnVector(from: ITransform, to: IVector): Vector {
        const fromObject = Transform.fromObject(from);
        let toCentered = Vector.subtract(to, fromObject.center);

        // TODO: Make it work 3D
        // TODO: Optimize

        // Rotate
        toCentered = toCentered.rotate(fromObject.rotate);

        // Scale
        toCentered = toCentered.multiply(fromObject.scale);

        // Translate
        toCentered = toCentered.add(fromObject.translate);

        return toCentered.add(fromObject.center);
    }

    public static toJSON(transform: ITransform) {
        return Transform.toObject(transform);
    }

    public static toObject(transform: ITransform): ITransform {
        const transformObject = Transform.fromObject(transform);

        const { translate, rotate, scale } = transformObject;
        const json: ITransform = {};

        if (!Vector.isZero(translate)) {
            json.translate = translate.toObject();
        }

        if (!Vector.isZero(rotate)) {
            json.rotate = rotate.toObject();
        }

        if (!Vector.isEqual(scale, Vector.one())) {
            json.scale = scale.toObject();
        }

        return json;
    }

    private constructor(
        public translate: Vector = Vector.zero(),
        public center: Vector = Vector.zero(),
        public rotate: Vector = Vector.zero(),
        public scale: Vector = Vector.one(), // Note: Skew will be available in the future> public skew: Vector = Vector.zero(),
    ) {}

    // Note: Bellow are instance equivalents of static methods

    public clone(): Transform {
        return Transform.clone(this);
    }

    public cloneDeep(): Transform {
        return Transform.cloneDeep(this);
    }

    public updateWithMutation(
        modifier: (Transform: Transform) => Transform | ITransform | void,
    ): Transform {
        return Transform.updateWithMutation(this, modifier);
    }

    /**
     * @deprecated Maybe only use apply
     */
    public combine(...transforms: ITransform[]): Transform {
        return Transform.combine(this, ...transforms);
    }

    public apply(modifier: ITransformApplyModifier): Transform {
        return Transform.apply(this, modifier);
    }

    public negate(): Transform {
        return Transform.negate(this);
    }

    public subtract(transform2: ITransform): Transform {
        return Transform.subtract(this, transform2);
    }

    public applyOnTransform(to: ITransform) {
        return Transform.applyOnTransform(this, to);
    }

    public applyOnVector(to: IVector) {
        return Transform.applyOnVector(this, to);
    }

    public toJSON() {
        return Transform.toJSON(this);
    }

    public toObject() {
        return Transform.toObject(this);
    }
}
