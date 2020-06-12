import { IVector } from './IVector';

export class Vector implements IVector {
    // TODO: DRY axis
    // TODO: DRY similar operations

    public static Zero(): Vector {
        // TODO: Static constructors with capital letters?
        return new Vector();
    }

    public static One(): Vector {
        // TODO: Static constructors with capital letters?
        return new Vector(1, 1, 1);
    }

    public static Scale(scale: number): Vector {
        // TODO: Static constructors with capital letters?
        // TODO: Is this a good name
        return Vector.One().scaleInPlace(scale);
    }

    public static WindowSize(): Vector {
        // TODO: Should be Size in the name - shouldnt be name just Window
        // TODO: Static constructors with capital letters?

        // TODO: !!! With debug console
        return new Vector(window.innerWidth, window.innerHeight, 0);
    }

    public static fromVector(vector: IVector): Vector {
        if (vector instanceof Vector) {
            return vector;
        }
        return new Vector(vector.x, vector.y, vector.z);
    }

    public static fromTopLeft(boundingBox: {
        top: number;
        left: number;
    }): Vector {
        return new Vector(boundingBox.left, boundingBox.top, 0);
    }

    public static add(...vectors: IVector[]): Vector {
        return new Vector(
            vectors.reduce((x, vector) => x + (vector.x || 0), 0),
            vectors.reduce((y, vector) => y + (vector.y || 0), 0),
            vectors.reduce((z, vector) => z + (vector.z || 0), 0),
        );
    }

    public static subtract(a: IVector, b: IVector): Vector {
        return new Vector(
            (a.x || 0) - (b.x || 0),
            (a.y || 0) - (b.y || 0),
            (a.z || 0) - (b.z || 0),
        );
    }

    public static scale(vector: IVector, scale: number): Vector {
        return new Vector(
            (vector.x || 0) * scale,
            (vector.y || 0) * scale,
            (vector.z || 0) * scale,
        );
    }

    constructor(public x = 0, public y: number = 0, public z: number = 0) {
        // TODO: Check values defined
        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            throw new Error(
                `Vector(${x},${y},${z}) can not be created due to NaN values.`,
            );
        }
    }

    public clone(): Vector {
        // TODO: Maybe getter?
        return new Vector(this.x, this.y, this.z);
    }

    public apply(modifier: (value: number) => number): Vector {
        // TODO: USE apply in all other methods to avoid making same thing 3x
        return this.clone().applyInPlace(modifier);
    }

    public applyInPlace(modifier: (value: number) => number): this {
        // TODO: USE apply in all other methods to avoid making same thing 3x
        for (const axis of [
            'x',
            'y',
            'z' /* TODO: Some central place or getter for all axis */,
        ] as Array<keyof Vector>) {
            const thisAny = this as any; // TODO: Better
            thisAny[axis] = modifier(this[axis] as number);
        }

        return this;
    }

    // TODO: consolidate 2 add methods and 1 static method
    public add(...vectors: IVector[]): Vector {
        return new Vector(
            vectors.reduce((x, vector) => x + (vector.x || 0), this.x),
            vectors.reduce((y, vector) => y + (vector.y || 0), this.y),
            vectors.reduce((z, vector) => z + (vector.z || 0), this.z),
        );
    }

    public addInPlace(...vectors: IVector[]): this {
        // TODO: void vs. never
        for (const vector of vectors) {
            this.x = this.x + (vector.x || 0);
            this.y = this.y + (vector.y || 0);
            this.z = this.z + (vector.z || 0);
        }
        return this;
    }

    public subtract(vector: IVector): Vector {
        return new Vector(
            this.x - (vector.x || 0),
            this.y - (vector.y || 0),
            this.z - (vector.z || 0),
        );
    }

    public subtractInPlace(vector: IVector): this {
        this.x = this.x - (vector.x || 0);
        this.y = this.y - (vector.y || 0);
        this.z = this.z - (vector.z || 0);
        return this;
    }

    public scale(scale: number): Vector {
        return new Vector(this.x * scale, this.y * scale, this.z * scale);
    }

    public scaleInPlace(scale: number): this {
        this.x = this.x * scale;
        this.y = this.y * scale;
        this.z = this.z * scale;
        return this;
    }

    public get half(): Vector {
        // TODO: Maybe not getter
        // TODO: Maybe halfInPlace,... etc.
        return this.scale(1 / 2);
    }

    public get third(): Vector {
        // TODO: Maybe not getter
        // TODO: Do we need this?
        return this.scale(1 / 3);
    }

    public get quarter(): Vector {
        // TODO: Maybe not getter
        // TODO: Do we need this?
        return this.scale(1 / 4);
    }

    public get double(): Vector {
        // TODO: Maybe not getter
        // TODO: Do we need this?
        return this.scale(2);
    }

    public boxMax(): Vector {
        // TODO: Maybe create boxMin and boxVolume and boxRound
        const value = Math.max(...this.toArray());
        return new Vector(...this.toArray().map((_) => value));
    }

    public map(
        modifier: (
            values: number[] /* TODO: Maybe tuple [number,number,number] */,
        ) => number[],
    ): Vector {
        return this.clone().mapInPlace(modifier);
    }

    public mapInPlace(
        modifier: (
            values: number[] /* TODO: Maybe tuple [number,number,number] */,
        ) => number[],
    ): this {
        let { x, y, z } = this;
        [x, y, z] = modifier([x, y, z]);
        Object.assign(this, { x, y, z });
        return this;
    }

    public length(vector: IVector = Vector.Zero()): number {
        // TODO: Maybe getter when without a param
        return Math.sqrt(
            Math.pow(this.x - (vector.x || 0), 2) +
                Math.pow(this.y - (vector.y || 0), 2) +
                Math.pow(this.z - (vector.z || 0), 2),
        );
    }

    // TODO: Maybe getter vector

    public rotation(vector: IVector = Vector.Zero()): number {
        // TODO: Just for compatibility, because it does not make sence in Vector
        return Math.atan2(this.y - (vector.y || 0), this.x - (vector.x || 0));
    }

    public rotate(radians: number, vector: IVector = Vector.Zero()): Vector {
        // TODO: Just for compatibility, because it does not make sence in Vector
        const base = this.subtract(vector);
        const length = base.length();
        const rotation = base.rotation();
        return new Vector(
            Math.cos(rotation + radians) * length,
            Math.sin(rotation + radians) * length,
        ).add(vector);
    }

    public toArray(): number[] {
        // TODO: [number | number] is legacy from TC
        return [this.x, this.y, this.z];
    }

    public toString(): string {
        return `[${this.x},${this.y},${this.z}]`;
    }

    // TODO: toCss toTopLeft
}
