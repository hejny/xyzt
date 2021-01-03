import { ε } from '../config';
import { IInversible } from '../interfaces/IInversible';
import { AXES, IAxis, IVectorData } from '../interfaces/IVectorData';
import {
    IAppliableOnVector,
    IVectorApplyModifier,
    IVectorApplyModifierFunction,
} from '../interfaces/IVectorApplyModifier';
import { stripInfatesimal } from '../utils/stripInfatesimal';

// TODO: toCss toTopLeft as helpers
// TODO: ? Vector is kind of Transform with only a translation
// TODO: ? add, subtract, etc should take also a Transform

export class Vector implements IVectorData, IInversible<IVectorData> {
    // TODO: DRY axis

    [axis: string]: any; // TODO: Better

    public static zero(): Vector {
        return new Vector();
    }

    public static cube(scale: number = 1): Vector {
        return new Vector(1, 1, 1).scale(scale);
    }

    public static square(scale: number = 1): Vector {
        return new Vector(1, 1).scale(scale);
    }

    /*
    public static WindowSize(): Vector {
        // TODO: As util
        return new Vector(window.innerWidth, window.innerHeight, 0);
    }
    */

    public static fromObject<T>(vector: IVectorData): Vector;
    public static fromObject<T>(vector: T, axisMapping: Array<keyof T>): Vector;
    public static fromObject<T>(vector: IVectorData | T, axisMapping?: Array<keyof T> | null): Vector {
        if (vector instanceof Vector) {
            return vector;
        }

        if (typeof vector === 'object') {
            const [x, y, z] = axisMapping || AXES;

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
        return new Vector(Math.cos(rotation) * distance, Math.sin(rotation) * distance);
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

    public static clone(vector: IVectorData): Vector {
        return new Vector(vector.x, vector.y, vector.z);
    }

    public static add(...vectors: IVectorData[]): Vector {
        return new Vector(
            vectors.reduce((x, vector) => x + (vector.x || 0), 0),
            vectors.reduce((y, vector) => y + (vector.y || 0), 0),
            vectors.reduce((z, vector) => z + (vector.z || 0), 0),
        );
    }

    public static subtract(vectorA: IVectorData, vectorB: IVectorData): Vector {
        return Vector.add(vectorA, Vector.fromObject(vectorB).negate());
    }

    public static multiply(...vectors: IVectorData[]): Vector {
        return new Vector(
            vectors.reduce((x, vector) => x * (vector.x || 0), 1),
            vectors.reduce((y, vector) => y * (vector.y || 0), 1),
            vectors.reduce((z, vector) => z * (vector.z || 0), 1),
        );
    }

    public static divide(vectorA: IVectorData, vectorB: IVectorData): Vector {
        return Vector.multiply(vectorA, Vector.fromObject(vectorB).inverse());
    }

    public static scale(vector: IVectorData, scale: number): Vector {
        return new Vector((vector.x || 0) * scale, (vector.y || 0) * scale, (vector.z || 0) * scale);
    }

    public static rotate(vector: IVectorData, rotate: IVectorData): Vector {
        return Vector.forEachPlane(vector, (ortogonalAxis, vectorBD) => {
            const rotateAxis = rotate[ortogonalAxis] || 0;
            const rotation = vectorBD.rotation();
            const distance = vectorBD.distance();
            return Vector.fromPolar(rotation + rotateAxis, distance);
        });
    }

    public static forEachPlane(
        vector: IVectorData,
        callback: (ortogonalAxis: IAxis, vectorBD: Vector) => IVectorData,
    ): Vector {
        let vectorObject = Vector.fromObject(vector);
        for (const axis of AXES) {
            vectorObject = Vector.forPlane(vectorObject, axis, (vectorBD) => {
                return callback(axis, vectorBD);
            });
        }
        return vectorObject;
    }

    public static forPlane(vector: IVectorData, axis: IAxis, callback: (vectorBD: Vector) => IVectorData): Vector {
        let { x, y, z } = Vector.fromObject(vector);

        switch (axis) {
            case 'x':
                [y, z] = Vector.fromObject(callback(new Vector(y, z))).toArray2D();
                break;
            case 'y':
                [x, z] = Vector.fromObject(callback(new Vector(x, z))).toArray2D();
                break;
            case 'z':
                [x, y] = Vector.fromObject(callback(new Vector(x, y))).toArray2D();
                break;
        }

        return new Vector(x, y, z);
    }

    public static dotProduct(vectorA: IVectorData, vectorB: IVectorData): number {
        const a = Vector.fromObject(vectorA);
        const b = Vector.fromObject(vectorB);
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    public static crossProduct(vectorA: IVectorData, vectorB: IVectorData): Vector {
        const a = Vector.fromObject(vectorA);
        const b = Vector.fromObject(vectorB);
        return new Vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }

    public static average(...vectors: IVectorData[]): IVectorData {
        return Vector.add(...vectors).scale(1 / vectors.length);
    }

    public static isEqual(vectorA: IVectorData, vectorB: IVectorData): boolean {
        // TODO: Maybe spread arguments as in add
        for (const axis of AXES) {
            if (Math.abs((vectorA[axis] || 0) - (vectorB[axis] || 0)) > ε) {
                return false;
            }
        }
        return true;
    }

    public static stripInfatesimals(vector: IVectorData): Vector {
        // TODO: Use in methods with problematic infatesimals to stop using toBeDeepCloseTo and toMatchCloseTo in tests
        // TODO: Use here Vector.map
        const vectorObject = Vector.clone(vector);
        for (const axis of ['x', 'y', 'z' /* TODO: Some central place or getter for all axis */] as Array<
            keyof IVectorData
        >) {
            vectorObject[axis] = stripInfatesimal(vectorObject[axis]);
        }
        return vectorObject;
    }

    public static isZero(vector: IVectorData): boolean {
        return Vector.isEqual({}, vector);
    }

    public static distance(vectorA: IVectorData, vectorB: IVectorData = Vector.zero()): number {
        return Math.sqrt(Vector.distanceSquared(vectorA, vectorB));
    }

    public static distanceSquared(vectorA: IVectorData, vectorB: IVectorData = Vector.zero()): number {
        return (
            ((vectorA.x || 0) - (vectorB.x || 0)) ** 2 +
            ((vectorA.y || 0) - (vectorB.y || 0)) ** 2 +
            ((vectorA.z || 0) - (vectorB.z || 0)) ** 2
        );
    }

    public static rotation(vectorA: IVectorData, vectorB: IVectorData = Vector.zero()): number {
        // TODO: Just for compatibility, because it does not make sence in Vector
        // TODO: Work with 3D rotation
        return Math.atan2((vectorA.y || 0) - (vectorB.y || 0), (vectorA.x || 0) - (vectorB.x || 0));
    }

    public static cubeMax(vector: IVectorData): Vector {
        // TODO: Maybe create boxMin and boxVolume and boxRound
        const value = Math.max(...Vector.fromObject(vector).toArray());
        return Vector.cube(value);
    }

    public static map(vector: IVectorData, modifier: (value: number, axis: keyof IVectorData) => number): Vector {
        const mappedVector = Vector.clone(vector);

        // TODO: USE apply in all other methods to avoid making same thing 3x
        for (const axis of ['x', 'y', 'z' /* TODO: Some central place or getter for all axis */] as Array<
            keyof IVectorData
        >) {
            mappedVector[axis] = modifier((vector[axis] as number) || 0, axis);
        }

        return mappedVector;
    }

    public static rearrangeAxis(
        vector: IVectorData,
        modifier: (values: number[] /* TODO: Maybe tuple [number,number,number] */) => number[],
    ): Vector {
        let { x, y, z } = vector;
        [x, y, z] = modifier([x || 0, y || 0, z || 0]);
        return new Vector(x, y, z);
    }

    public static apply(vector: IVectorData, modifier: IVectorApplyModifier): Vector {
        if (typeof modifier === 'function') {
            return Vector.fromObject(modifier(Vector.fromObject(vector)));
        } else {
            return Vector.fromObject(modifier.applyOnVector(Vector.fromObject(vector)));
        }
    }

    public static within(
        // TODO: !!! integrate Coorsys
        vector: IVectorData,
        context: IInversible<IAppliableOnVector>,
        modifier: IVectorApplyModifierFunction,
    ): Vector {
        return Vector.apply(modifier(Vector.apply(vector, context)), context.inverse());
    }

    public static to2D(vector: IVectorData): Vector {
        return new Vector(vector.x, vector.y);
    }

    public static toObject<T = IVectorData>(vector: IVectorData, axisMapping?: Array<keyof T>): T {
        const object: Partial<T> = {};
        const array = Vector.toArray(vector);

        for (const axis of (axisMapping || AXES) as Array<keyof T>) {
            object[axis] = (array.shift() || 0) as any;
        }
        return object as T;
    }

    public static toObject2D(vector: IVectorData): IVectorData {
        return { x: vector.x || 0, y: vector.y || 0 };
    }

    public static toObject3D(vector: IVectorData): IVectorData {
        return { x: vector.x || 0, y: vector.y || 0, z: vector.z || 0 };
    }

    public static toArray(vector: IVectorData): number[] {
        return [vector.x || 0, vector.y || 0, vector.z || 0];
    }

    public static toArray2D(vector: IVectorData): [number, number] {
        return [vector.x || 0, vector.y || 0];
    }

    public static toArray3D(vector: IVectorData): [number, number, number] {
        return [vector.x || 0, vector.y || 0, vector.z || 0];
    }

    public static toString(vector: IVectorData): string {
        return `[${vector.x || 0},${vector.y || 0},${vector.z || 0}]`;
    }

    public static toString2D(vector: IVectorData): string {
        return `[${vector.x || 0},${vector.y || 0}]`;
    }

    public static toString3D(vector: IVectorData): string {
        return `[${vector.x || 0},${vector.y || 0},${vector.z || 0}]`;
    }

    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    public constructor(vector: IVectorData);
    public constructor(x?: number, y?: number, z?: number);
    public constructor(x?: number | IVectorData, y?: number, z?: number) {
        if (typeof x === 'number' || x === undefined || x === null) {
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
        return this.map((v) => 1 / v).stripInfatesimals();
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
    // TODO: Auto-generate them

    public clone(): Vector {
        return Vector.clone(this);
    }

    // TODO: updateWithMutation

    public add(...vectors: IVectorData[]): Vector {
        return Vector.add(this, ...vectors);
    }

    public subtract(vectorB: IVectorData): Vector {
        return Vector.subtract(this, vectorB);
    }

    public multiply(...vectors: IVectorData[]): Vector {
        return Vector.multiply(this, ...vectors);
    }

    public divide(vectorB: IVectorData): Vector {
        return Vector.divide(this, vectorB);
    }

    public scale(scale: number): Vector {
        return Vector.scale(this, scale);
    }

    public rotate(rotate: IVectorData): Vector {
        return Vector.rotate(this, rotate);
    }

    public forEachPlane(callback: (ortogonalAxis: IAxis, vectorBD: Vector) => IVectorData): Vector {
        return Vector.forEachPlane(this, callback);
    }

    public forPlane(axis: IAxis, callback: (vectorBD: Vector) => IVectorData): Vector {
        return Vector.forPlane(this, axis, callback);
    }

    public dotProduct(vectorB: IVectorData): number {
        return Vector.dotProduct(this, vectorB);
    }

    public crossProduct(vectorB: IVectorData): Vector {
        return Vector.crossProduct(this, vectorB);
    }

    public isEqual(vectorB: IVectorData): boolean {
        return Vector.isEqual(this, vectorB);
    }

    public isZero(): boolean {
        return Vector.isZero(this);
    }

    public stripInfatesimals(): Vector {
        return Vector.stripInfatesimals(this);
    }

    public distance(vectorB?: IVectorData): number {
        return Vector.distance(this, vectorB);
    }

    public distanceSquared(vectorB?: IVectorData): number {
        return Vector.distanceSquared(this, vectorB);
    }

    public rotation(vectorB?: IVectorData): number {
        return Vector.rotation(this, vectorB);
    }

    public cubeMax(): Vector {
        return Vector.cubeMax(this);
    }

    public map(modifier: (value: number, axis: keyof IVectorData) => number): Vector {
        return Vector.map(this, modifier);
    }

    public rearrangeAxis(modifier: (values: number[]) => number[]): Vector {
        return Vector.rearrangeAxis(this, modifier);
    }

    public apply(modifier: IVectorApplyModifier): Vector {
        return Vector.apply(this, modifier);
    }

    public within(context: IInversible<IAppliableOnVector>, modifier: IVectorApplyModifierFunction): Vector {
        // TODO: !!! integrate Coorsys
        return Vector.within(this, context, modifier);
    }

    public to2D() {
        return Vector.to2D(this);
    }

    public toObject<T = IVectorData>(axisMapping?: Array<keyof T>) {
        return Vector.toObject(this, axisMapping);
    }

    /**
     * Prefered way is to use toObject. This is just for compatibility with JSON.strigify.
     */
    public toJSON() {
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
