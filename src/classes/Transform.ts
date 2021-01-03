import { IInversible } from '../interfaces/IInversible';
import { ITransformData } from '../interfaces/ITransformData';
import { IAppliableOnTransform, ITransformApplyModifier } from '../interfaces/ITransformApplyModifier';
import { IVectorData } from '../interfaces/IVectorData';
import { IAppliableOnVector } from '../interfaces/IVectorApplyModifier';
import { convertAngle } from '../utils/convertAngle';
import { Vector } from './Vector';

export class Transform implements IInversible<ITransformData & IAppliableOnTransform & IAppliableOnVector> {
    public static neutral(): Transform {
        return new Transform();
    }

    public static translate(translate: IVectorData): Transform {
        return Transform.fromObject({ translate });
    }

    public static rotate(rotate: number | IVectorData): Transform {
        return Transform.fromObject({ rotate });
    }

    public static scale(scale: number | IVectorData): Transform {
        return Transform.fromObject({ scale });
    }

    public static fromObject(transform: ITransformData): Transform {
        if (transform instanceof Transform) {
            return transform;
        }
        return Transform.clone(transform);
    }

    // Note: Static methods bellow have instance equivalents

    public static clone(transform: ITransformData): Transform {
        const optionsFull: Required<ITransformData> = {
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
                ? Vector.cube(optionsFull.scale)
                : Vector.fromObject(optionsFull.scale),
            // Note: Skew will be available in the future>  Vector.fromObject(optionsFull.skew),
        );
    }

    public static cloneDeep(transform: ITransformData): Transform {
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
        transform: ITransformData,
        modifier: (Transform: Transform) => Transform | ITransformData | void,
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

    public static apply(transform: ITransformData, modifier: ITransformApplyModifier): Transform {
        if (typeof modifier === 'function') {
            return Transform.fromObject(modifier(Transform.fromObject(transform)));
        } else {
            return Transform.fromObject(modifier.applyOnTransform(Transform.fromObject(transform)));
        }
    }

    public static inverse(transform: ITransformData): Transform {
        const transformFull = Transform.fromObject(transform);
        return new Transform(
            transformFull.translate.negate(),
            transformFull.rotate.negate(),
            transformFull.scale.inverse(),
        );
    }

    // TODO: isEqual

    public static applyOnTransform(from: ITransformData, to: ITransformData): Transform {
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
    }

    public static applyOnVector(from: ITransformData, to: IVectorData): Vector {
        let fromObject = Transform.fromObject(from);
        return Vector.fromObject(to)
            .add(fromObject.translate)
            .rotate(fromObject.rotate)
            .multiply(fromObject.scale)
            .stripInfatesimals();
    }

    public static pick(transform: ITransformData, ...keys: Array<keyof ITransformData>): Transform {
        const transformObject = Transform.fromObject(transform);
        return Transform.neutral().updateWithMutation((t) => {
            for (const key of keys) {
                t[key] = transformObject[key];
            }
        });
    }

    public static toJSON(transform: ITransformData) {
        return Transform.toObject(transform);
    }

    public static toObject(transform: ITransformData): ITransformData {
        const transformObject = Transform.fromObject(transform);

        const { translate, rotate, scale } = transformObject;
        const json: ITransformData = {};

        if (!Vector.isZero(translate)) {
            json.translate = translate.toObject();
        }

        if (!Vector.isZero(rotate)) {
            json.rotate = rotate.toObject();
        }

        if (!Vector.isEqual(scale, Vector.cube())) {
            json.scale = scale.toObject();
        }

        return json;
    }

    public static toString(transform: ITransformData): string {
        return JSON.stringify(Transform.toObject(transform));
    }

    public constructor(
        public translate: Vector = Vector.zero(),
        // public center: Vector = Vector.zero(),
        public rotate: Vector = Vector.zero(),
        public scale: Vector = Vector.cube(), // Note: Skew will be available in the future> public skew: Vector = Vector.zero(),
    ) {}

    // Note: Bellow are instance equivalents of static methods
    // TODO: Auto-generate them

    public clone(): Transform {
        return Transform.clone(this);
    }

    public cloneDeep(): Transform {
        return Transform.cloneDeep(this);
    }

    public updateWithMutation(modifier: (Transform: Transform) => Transform | ITransformData | void): Transform {
        return Transform.updateWithMutation(this, modifier);
    }

    public apply(modifier: ITransformApplyModifier): Transform {
        return Transform.apply(this, modifier);
    }

    public inverse(): Transform {
        return Transform.inverse(this);
    }

    public applyOnTransform(to: ITransformData) {
        return Transform.applyOnTransform(this, to);
    }

    public applyOnVector(to: IVectorData) {
        return Transform.applyOnVector(this, to);
    }

    public pick(...keys: Array<keyof ITransformData>): Transform {
        return Transform.pick(this, ...keys);
    }

    public toJSON() {
        return Transform.toJSON(this);
    }

    public toObject() {
        return Transform.toObject(this);
    }

    public toString() {
        return Transform.toString(this);
    }
}
