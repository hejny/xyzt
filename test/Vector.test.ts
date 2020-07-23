import { Vector } from '../src/Vector';

describe('Vector2', () => {
    // ______________[ Setup ]

    const point0x0y = new Vector(0, 0);
    const point1x1y = new Vector(1, 1);
    const point1x2y = new Vector(1, 2);
    const point2x2y = new Vector(2, 2);

    // ______________[ Tests ]

    // TODO: Create test for public static fromVector(vector: IVector): Vector
    // TODO: Create test for public static add(...vectors: IVector[]): Vector {
    // TODO: Create test for public static subtract(a: IVector, b: IVector): Vector {
    // TODO: Create test for public static scale(vector: IVector, scale: number): Vector {

    it('isEqual', () => {
        expect(Vector.isEqual(point1x1y, point1x1y)).toBe(true);
        expect(Vector.isEqual(point1x1y, point1x1y.clone())).toBe(true);
        expect(Vector.isEqual(point1x1y, point1x1y.scale(1))).toBe(true);
        expect(
            Vector.isEqual(point1x1y, point1x1y.scale(100).scale(1 / 100)),
        ).toBe(true);
        expect(Vector.isEqual(point1x1y, point2x2y.scale(1 / 2))).toBe(true);
        expect(Vector.isEqual(point0x0y, {})).toBe(true);
        expect(Vector.isEqual({}, {})).toBe(true);

        expect(Vector.isEqual(point1x1y, point2x2y)).toBe(false);
        expect(Vector.isEqual(point1x1y, {})).toBe(false);
    });

    // TODO: Create test for public clone(): Vector {
    // TODO: Create test for public isEqual(vector: IVector): boolean
    // TODO: Create test for public apply(
    // TODO: Create test for public applyInPlace(
    // TODO: Create test for public add(...vectors: IVector[]): Vector {
    // TODO: Create test for public addInPlace(...vectors: IVector[]): this {
    // TODO: Create test for public subtract(vector: IVector): Vector {
    // TODO: Create test for public subtractInPlace(vector: IVector): this {
    // TODO: Create test for public scale(scale: number): Vector {
    // TODO: Create test for public scaleInPlace(scale: number): this {
    // TODO: Create test for public get half(): Vector {
    // TODO: Create test for public get third(): Vector {
    // TODO: Create test for public get quarter(): Vector {
    // TODO: Create test for public get double(): Vector {
    // TODO: Create test for public boxMax(): Vector {
    // TODO: Create test for public map(
    // TODO: Create test for public mapInPlace(

    it('length', () => {
        expect(point1x1y.length()).toBeCloseTo(1.41, 0.1);
        expect(point2x2y.length()).toBeCloseTo(1.41 * 2, 0.1);
        expect(point2x2y.length(point1x1y)).toBeCloseTo(1.41, 0.1);
        expect(point2x2y.length(point1x2y)).toEqual(1);
    });

    // TODO: Create test for public rotation(vector: IVector = Vector.Zero()): number {
    // TODO: Create test for public rotate(radians: number, vector: IVector = Vector.Zero()): Vector {
    // TODO: Create test for public toArray(): number[] {
    // TODO: Create test for public toString(): string {
});
