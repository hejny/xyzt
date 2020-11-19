import { ITransform } from '../interfaces/ITransform';
import { IAppliableOnVector } from '../interfaces/IVectorApplyModifier';
import { IVector } from '../interfaces/IVector';
import { convertAngle } from '../utils/convertAngle';
import { Vector } from './Vector';

export class Transform implements ITransform, IAppliableOnVector {
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
            Vector.fromObject(transformFull.rotate).clone(),
            Vector.fromObject(transformFull.scale).clone(),
            // Note: Skew will be available in the future>  Vector.fromObject(transformFull.skew).clone(),
        );
    }

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

    public static negate(transform: ITransform): Transform {
        const transformFull = Transform.fromObject(transform);
        return new Transform(
            transformFull.translate.negate(),
            transformFull.rotate.negate(),
            transformFull.scale.inverse(),
            // Note: Skew will be available in the future> transformFull.skew.negate(),
        );
    }

    public static subtract(
        transform1: ITransform,
        transform2: ITransform,
    ): Transform {
        return Transform.combine(transform1, Transform.negate(transform2));
    }

    // TODO: isEqual

    public static applyOnVector(
        transform: ITransform,
        point: IVector,
        center: IVector = Vector.zero(),
    ): Vector {
        let pointCentered = Vector.subtract(point, center);
        const transformObject = Transform.fromObject(transform);

        // TODO: Make it work 3D
        // TODO: Optimize

        // Translate
        pointCentered = pointCentered.add(transformObject.translate);

        // Scale
        pointCentered = pointCentered.multiply(transformObject.scale);

        // Rotate
        pointCentered = pointCentered.rotate(transformObject.rotate);

        return pointCentered.add(center);
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

    public combine(...transforms: ITransform[]): Transform {
        return Transform.combine(this, ...transforms);
    }

    public negate(): Transform {
        return Transform.negate(this);
    }

    public subtract(transform2: ITransform): Transform {
        return Transform.subtract(this, transform2);
    }

    public applyOnVector(point: IVector, center?: IVector) {
        return Transform.applyOnVector(this, point, center);
    }

    public toJSON() {
        return Transform.toJSON(this);
    }

    public toObject() {
        return Transform.toObject(this);
    }
}
