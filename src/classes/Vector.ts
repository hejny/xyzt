import { AXIS, IAxis, IVector } from '../interfaces/IVector';
import { IVectorApplyModifier } from '../interfaces/IVectorApplyModifier';

// TODO: toCss toTopLeft as helpers
// TODO: ? Vector is kind of Transform with only a translation
// TODO: ? add, subtract, etc should take also a Transform

export class Vector implements IVector {
    // TODO: DRY axis

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

    public static fromObject<T>(vector: IVector): Vector;
    public static fromObject<T>(vector: T, axisMapping: Array<keyof T>): Vector;
    public static fromObject<T>(
        vector: IVector | T,
        axisMapping?: Array<keyof T> | null,
    ): Vector {
        if (vector instanceof Vector) {
            return vector;
        }

        if (typeof vector === 'object') {
            const [x, y, z] = axisMapping || AXIS;

            // @ts-expect-error
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

    public static fromPolar(rotation: number, distance: number = 1): Vector {
        // TODO: also interface with object options
        return new Vector(
            Math.cos(rotation) * distance,
            Math.sin(rotation) * distance,
        );
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
            vectors.reduce((x, vector) => x * (vector.x || 0), 1),
            vectors.reduce((y, vector) => y * (vector.y || 0), 1),
            vectors.reduce((z, vector) => z * (vector.z || 0), 1),
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

    public static rotate(vector: IVector, rotate: IVector): Vector {
        return Vector.forEachPlane(vector, (ortogonalAxis, vector2D) => {
            const rotateAxis = rotate[ortogonalAxis] || 0;
            const rotation = vector2D.rotation();
            const distance = vector2D.distance();
            return Vector.fromPolar(rotation + rotateAxis, distance);
        });
    }

    public static forEachPlane(
        vector: IVector,
        callback: (ortogonalAxis: IAxis, vector2D: Vector) => IVector,
    ): Vector {
        let vectorObject = Vector.fromObject(vector);
        for (const axis of AXIS) {
            vectorObject = Vector.forPlane(vectorObject, axis, (vector2D) => {
                return callback(axis, vector2D);
            });
        }
        return vectorObject;
    }

    public static forPlane(
        vector: IVector,
        axis: IAxis,
        callback: (vector2D: Vector) => IVector,
    ): Vector {
        let { x, y, z } = Vector.fromObject(vector);

        switch (axis) {
            case 'x':
                [y, z] = Vector.fromObject(
                    callback(new Vector(y, z)),
                ).toArray2D();
                break;
            case 'y':
                [x, z] = Vector.fromObject(
                    callback(new Vector(x, z)),
                ).toArray2D();
                break;
            case 'z':
                [x, y] = Vector.fromObject(
                    callback(new Vector(x, y)),
                ).toArray2D();
                break;
        }

        return new Vector(x, y, z);
    }

    public static dotProduct(vector1: IVector, vector2: IVector): number {
        const a = Vector.fromObject(vector1);
        const b = Vector.fromObject(vector2);
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    public static crossProduct(vector1: IVector, vector2: IVector): Vector {
        const a = Vector.fromObject(vector1);
        const b = Vector.fromObject(vector2);
        return new Vector(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x,
        );
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

    public static apply(
        vector: IVector,
        modifier: IVectorApplyModifier,
    ): Vector {
        if (typeof modifier === 'function') {
            return Vector.fromObject(modifier(Vector.fromObject(vector)));
        } else {
            return Vector.fromObject(
                modifier.applyOnVector(Vector.fromObject(vector)),
            );
        }
    }

    public static to2D(vector: IVector): Vector {
        return new Vector(vector.x, vector.y);
    }

    public static toJSON(vector: IVector) {
        return Vector.toObject(vector);
    }

    public static toObject(vector: IVector): IVector {
        return { x: vector.x || 0, y: vector.y || 0, z: vector.z || 0 };
    }

    public static toObject2D(vector: IVector): IVector {
        return { x: vector.x || 0, y: vector.y || 0 };
    }

    public static toObject3D(vector: IVector): IVector {
        return { x: vector.x || 0, y: vector.y || 0, z: vector.z || 0 };
    }

    public static toArray(vector: IVector): number[] {
        return [vector.x || 0, vector.y || 0, vector.z || 0];
    }

    public static toArray2D(vector: IVector): [number, number] {
        return [vector.x || 0, vector.y || 0];
    }

    public static toArray3D(vector: IVector): [number, number, number] {
        return [vector.x || 0, vector.y || 0, vector.z || 0];
    }

    public static toString(vector: IVector): string {
        return `[${vector.x || 0},${vector.y || 0},${vector.z || 0}]`;
    }

    public static toString2D(vector: IVector): string {
        return `[${vector.x || 0},${vector.y || 0}]`;
    }

    public static toString3D(vector: IVector): string {
        return `[${vector.x || 0},${vector.y || 0},${vector.z || 0}]`;
    }

    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    public constructor(vector: IVector);
    public constructor(x?: number, y?: number, z?: number);
    public constructor(x?: number | IVector, y?: number, z?: number) {
        if (typeof x === 'number' || x === undefined) {
            if (isNaN(x || 0) || isNaN(y || 0) || isNaN(z || 0)) {
                throw new Error(
                    `Vector can not be constructed due to NaN values.`,
                );
            }

            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        } else {
            const vector = x;
            this.x = vector.x || 0;
            this.y = vector.y || 0;
            this.z = vector.z || 0;
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

    // TODO: updateWithMutation

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

    public rotate(rotate: IVector): Vector {
        return Vector.rotate(this, rotate);
    }

    public forEachPlane(
        callback: (ortogonalAxis: IAxis, vector2D: Vector) => IVector,
    ): Vector {
        return Vector.forEachPlane(this, callback);
    }

    public forPlane(
        axis: IAxis,
        callback: (vector2D: Vector) => IVector,
    ): Vector {
        return Vector.forPlane(this, axis, callback);
    }

    public dotProduct(vector2: IVector): number {
        return Vector.dotProduct(this, vector2);
    }

    public crossProduct(vector2: IVector): Vector {
        return Vector.crossProduct(this, vector2);
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

    public apply(modifier: IVectorApplyModifier): Vector {
        return Vector.apply(this, modifier);
    }

    public to2D() {
        return Vector.to2D(this);
    }

    public toJSON() {
        return Vector.toJSON(this);
    }

    public toObject() {
        return Vector.toObject(this);
    }

    public toObject2D() {
        return Vector.toObject2D(this);
    }

    public toObject3D() {
        return Vector.toObject3D(this);
    }

    public toArray() {
        return Vector.toArray(this);
    }

    public toArray2D() {
        return Vector.toArray2D(this);
    }

    public toArray3D() {
        return Vector.toArray3D(this);
    }

    public toString() {
        return Vector.toString(this);
    }

    public toString2D() {
        return Vector.toString2D(this);
    }

    public toString3D() {
        return Vector.toString3D(this);
    }
}
