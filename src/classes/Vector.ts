import { IVector } from '../interfaces/IVector';

// TODO: toCss toTopLeft as helpers
// TODO: ? Vector is kind of Transform with only a translation
// TODO: ? add, subtract, etc should take also a Transform

export class Vector implements IVector {
    // TODO: DRY axis
    // TODO: DRY similar operations

    [axis: string]: any; // TODO: Better

    public static zero(): Vector {
        return new Vector();
    }

    public static one(): Vector {
        return new Vector(1, 1, 1);
    }

    public static box(scale: number): Vector {
        return Vector.one().scale(scale);
    }

    /*
    public static WindowSize(): Vector {
        // TODO: As util
        return new Vector(window.innerWidth, window.innerHeight, 0);
    }
    */

    public static fromObject(
        vector: IVector,
        axisMapping: string[] = ['x', 'y', 'z'],
    ): Vector {
        if (vector instanceof Vector) {
            return vector;
        }

        if (typeof vector === 'object') {
            const [x, y, z] = axisMapping;

            return new Vector(vector[x], vector[y], vector[z]);
        }

        return new Vector();
    }

    public static fromArray(values: number[]): Vector;
    public static fromArray(...values: number[]): Vector;
    public static fromArray(...values: number[] | [number[]]): Vector {
        if (Array.isArray(values[0])) {
            return Vector.fromArray(...values[0]);
        }

        return new Vector(...(values as number[]));
    }

    /*
    public static fromTopLeft(boundingBox: {
        top: number;
        left: number;
    }): Vector {
        // TODO: !!! To utils
        return new Vector(boundingBox.left, boundingBox.top, 0);
    }
    */

    // Note: Static methods bellow have instance equivalents

    public static clone(vector: IVector): Vector {
        return new Vector(vector.x, vector.y, vector.z);
    }

    public static add(...vectors: IVector[]): Vector {
        return new Vector(
            vectors.reduce((x, vector) => x + (vector.x || 0), 0),
            vectors.reduce((y, vector) => y + (vector.y || 0), 0),
            vectors.reduce((z, vector) => z + (vector.z || 0), 0),
        );
    }

    public static subtract(vector1: IVector, vector2: IVector): Vector {
        return Vector.add(vector1, Vector.fromObject(vector2).negate());
    }

    public static multiply(...vectors: IVector[]): Vector {
        return new Vector(
            vectors.reduce((x, vector) => x + (vector.x || 0), 1),
            vectors.reduce((y, vector) => y + (vector.y || 0), 1),
            vectors.reduce((z, vector) => z + (vector.z || 0), 1),
        );
    }

    public static divide(vector1: IVector, vector2: IVector): Vector {
        return Vector.multiply(vector1, Vector.fromObject(vector2).inverse());
    }

    public static scale(vector: IVector, scale: number): Vector {
        return new Vector(
            (vector.x || 0) * scale,
            (vector.y || 0) * scale,
            (vector.z || 0) * scale,
        );
    }

    public static rotate(
        vector: IVector,
        radians: number,
        center: IVector = Vector.zero(),
    ): Vector {
        // TODO: Just for compatibility, because it does not make sence in Vector
        const base = Vector.fromObject(vector).subtract(center);
        const length = base.length();
        const rotation = base.rotation();
        return new Vector(
            Math.cos(rotation + radians) * length,
            Math.sin(rotation + radians) * length,
        ).add(center);
    }

    public static isEqual(vector1: IVector, vector2: IVector): boolean {
        // TODO: Maybe spread arguments as in add
        for (const axis of [
            'x',
            'y',
            'z' /* TODO: Some central place or getter for all axis */,
        ] as Array<keyof IVector>) {
            if ((vector1[axis] || 0) !== (vector2[axis] || 0)) {
                return false;
            }
        }
        return true;
    }

    public static isZero(vector: IVector): boolean {
        // TODO: Maybe spread arguments as in add
        for (const axis of [
            'x',
            'y',
            'z' /* TODO: Some central place or getter for all axis */,
        ] as Array<keyof IVector>) {
            if (vector[axis] !== 0) {
                return false;
            }
        }
        return true;
    }

    public static distance(
        vector1: IVector,
        vector2: IVector = Vector.zero(),
    ): number {
        return Math.sqrt(Vector.distanceSquared(vector1, vector2));
    }

    public static distanceSquared(
        vector1: IVector,
        vector2: IVector = Vector.zero(),
    ): number {
        return (
            ((vector1.x || 0) - (vector2.x || 0)) ** 2 +
            ((vector1.y || 0) - (vector2.y || 0)) ** 2 +
            ((vector1.z || 0) - (vector2.z || 0)) ** 2
        );
    }

    public static rotation(
        vector1: IVector,
        vector2: IVector = Vector.zero(),
    ): number {
        // TODO: Just for compatibility, because it does not make sence in Vector
        // TODO: Work with 3D rotation
        return Math.atan2(
            (vector1.y || 0) - (vector2.y || 0),
            (vector1.x || 0) - (vector2.x || 0),
        );
    }

    public static boxMax(vector: IVector): Vector {
        // TODO: Maybe create boxMin and boxVolume and boxRound
        const value = Math.max(...Vector.fromObject(vector).toArray());
        return Vector.box(value);
    }

    public static map(
        vector: IVector,
        modifier: (value: number, axis: keyof IVector) => number,
    ): Vector {
        const mappedVector = Vector.clone(vector);

        // TODO: USE apply in all other methods to avoid making same thing 3x
        for (const axis of [
            'x',
            'y',
            'z' /* TODO: Some central place or getter for all axis */,
        ] as Array<keyof IVector>) {
            mappedVector[axis] = modifier(vector[axis] || 0, axis);
        }

        return mappedVector;
    }

    public static rearrangeAxis(
        vector: IVector,
        modifier: (
            values: number[] /* TODO: Maybe tuple [number,number,number] */,
        ) => number[],
    ): Vector {
        let { x, y, z } = vector;
        [x, y, z] = modifier([x || 0, y || 0, z || 0]);
        return new Vector(x, y, z);
    }

    public static toArray(vector: IVector): number[] {
        return [vector.x || 0, vector.y || 0, vector.z || 0];
    }

    public static toString(vector: IVector): string {
        return `[${vector.x || 0},${vector.y || 0},${vector.z || 0}]`;
    }

    private constructor(
        public x = 0,
        public y: number = 0,
        public z: number = 0,
    ) {
        // TODO: Maybe better controll data in runtime

        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            throw new Error(
                `Vector(${x},${y},${z}) can not be created due to NaN values.`,
            );
        }
    }

    public inverse(): Vector {
        return this.map((v) => 1 / v);
    }

    public negate(): Vector {
        return this.scale(-1);
    }

    public half(): Vector {
        return this.scale(1 / 2);
    }

    public third(): Vector {
        return this.scale(1 / 3);
    }

    public quarter(): Vector {
        return this.scale(1 / 4);
    }

    public double(): Vector {
        return this.scale(2);
    }

    public triple(): Vector {
        return this.scale(3);
    }

    // Note: Bellow are instance equivalents of static methods

    public clone(): Vector {
        return Vector.clone(this);
    }

    public add(...vectors: IVector[]): Vector {
        return Vector.add(this, ...vectors);
    }

    public subtract(vector2: IVector): Vector {
        return Vector.subtract(this, vector2);
    }

    public multiply(...vectors: IVector[]): Vector {
        return Vector.multiply(this, ...vectors);
    }

    public divide(vector2: IVector): Vector {
        return Vector.subtract(this, vector2);
    }

    public scale(scale: number): Vector {
        return Vector.scale(this, scale);
    }

    public rotate(radians: number, center?: IVector): Vector {
        return Vector.rotate(this, radians, center);
    }

    public isEqual(vector2: IVector): boolean {
        return Vector.isEqual(this, vector2);
    }

    public isZero(): boolean {
        return Vector.isZero(this);
    }

    public distance(vector2?: IVector): number {
        return Vector.distance(this, vector2);
    }

    public distanceSquared(vector2?: IVector): number {
        return Vector.distanceSquared(this, vector2);
    }

    public rotation(vector2?: IVector): number {
        return Vector.rotation(this, vector2);
    }

    public boxMax(): Vector {
        return Vector.boxMax(this);
    }

    public map(
        modifier: (value: number, axis: keyof IVector) => number,
    ): Vector {
        return Vector.map(this, modifier);
    }

    public rearrangeAxis(modifier: (values: number[]) => number[]): Vector {
        return Vector.rearrangeAxis(this, modifier);
    }

    public toArray(): number[] {
        return Vector.toArray(this);
    }

    public toString(): string {
        return Vector.toString(this);
    }
}
