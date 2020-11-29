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

    public static rotate(rotate: number | IVector): Transform {
        return Transform.fromObject({ rotate });
    }

    public static scale(scale: number | IVector): Transform {
        return Transform.fromObject({ scale });
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
            // Vector.fromObject(optionsFull.center),
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
            // Vector.fromObject(transformFull.center).clone(),
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
            transformFull.rotate.negate(),
            transformFull.scale.inverse(),
        );
    }

    // TODO: isEqual

    public static applyOnTransform(
        from: ITransform,
        to: ITransform,
    ): Transform {
        const t1 = Transform.fromObject(from);
        const t2 = Transform.fromObject(to);

        return Transform.fromObject({
            rotate: Vector.add(t1.rotate, t2.rotate),
            scale: Vector.multiply(t1.scale, t2.scale),
            translate: Vector.add(
                t1.translate,
                t2.translate.apply(
                    t1.updateWithMutation((t) => {
                        // !!!
                        t.translate = Vector.zero();
                    }),
                ),
            ),
        });

        /*
        const fromObject = Transform.fromObject(from);
        let toCentered = Transform.updateWithMutation(to, (t) => {
            t.translate = t.translate.subtract(fromObject.translate);
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
            t.translate = t.translate.add(fromObject.translate);
        });
        */
    }

    public static applyOnVector(from: ITransform, to: IVector): Vector {
        let fromObject = Transform.fromObject(from);
        return Vector.fromObject(to)
            .add(fromObject.translate)
            .rotate(fromObject.rotate)
            .multiply(fromObject.scale);
    }

    public static pick(
        transform: ITransform,
        ...keys: Array<keyof ITransform>
    ): Transform {
        const transformObject = Transform.fromObject(transform);
        return Transform.neutral().updateWithMutation((t) => {
            for (const key of keys) {
                t[key] = transformObject[key];
            }
        });
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
        // public center: Vector = Vector.zero(),
        public rotate: Vector = Vector.zero(),
        public scale: Vector = Vector.one(), // Note: Skew will be available in the future> public skew: Vector = Vector.zero(),
    ) {}

    // Note: Bellow are instance equivalents of static methods
    // TODO: Auto-generate them

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

    public apply(modifier: ITransformApplyModifier): Transform {
        return Transform.apply(this, modifier);
    }

    public negate(): Transform {
        return Transform.negate(this);
    }

    public applyOnTransform(to: ITransform) {
        return Transform.applyOnTransform(this, to);
    }

    public applyOnVector(to: IVector) {
        return Transform.applyOnVector(this, to);
    }

    public pick(...keys: Array<keyof ITransform>): Transform {
        return Transform.pick(this, ...keys);
    }

    public toJSON() {
        return Transform.toJSON(this);
    }

    public toObject() {
        return Transform.toObject(this);
    }
}
