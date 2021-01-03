import { ICoorsys } from '../interfaces/ICoorsys';
import { IVector } from '../interfaces/IVector';
import { IPointData } from '../interfaces/IPointData';
import { Vector } from './Vector';

/**
 * @experimental
 */
export class Point implements IPointData {
    [axis: string]: any; // TODO: Better

    readonly vector: Vector;

    public static fromObject(coorsysLibrary: ICoorsys[], vectorInCoorsys: IPointData): Point {
        const coorsys = coorsysLibrary.find(({ coorsysName }) => coorsysName === vectorInCoorsys.coorsysName);
        if (!coorsys) {
            throw new Error(`Can not find "${vectorInCoorsys.coorsysName}" in provided library.`);
        }
        return new Point(coorsys, vectorInCoorsys);
    }

    constructor(readonly coorsys: ICoorsys, vector: IVector) {
        this.vector = Vector.fromObject(vector);
    }

    public get coorsysName(): string {
        return this.coorsys.coorsysName;
    }

    // !! what is the best name in/on
    public in(coorsys: ICoorsys): Point {
        const selfInNeutral = this.coorsys.vectorToNeutral(this.vector);
        return new Point(coorsys, coorsys.vectorFromNeutral(selfInNeutral));
    }

    public toObject(): IPointData {
        return {
            // Note: error "'coorsysName' is specified more than once, so this usage will be overwritten" is nonsence
            // @ts-expect-error
            coorsysName: this.coorsysName,
            ...this.vector.toObject(),
        };
    }

    /**
     * Prefered way is to use toObject. This is just for compatibility with JSON.strigify.
     */
    public toJSON() {
        return this.toObject();
    }

    // !! All operations + axis accessors
}
