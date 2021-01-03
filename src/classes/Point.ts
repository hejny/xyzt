import { ICoorsys } from '../interfaces/ICoorsys';
import { IVectorData } from '../interfaces/IVectorData';
import { IPointData } from '../interfaces/IPointData';
import { Vector } from './Vector';

/**
 * @experimental
 */
export class Point implements IPointData {
    [axis: string]: any; // TODO: Better

    readonly vector: Vector;

    public static fromObject(coorsysLibrary: ICoorsys[], vectorInCoorsys: IPointData): Point {
        const coorsys = coorsysLibrary.find(({ csid }) => csid === vectorInCoorsys.csid);
        if (!coorsys) {
            throw new Error(`Can not find "${vectorInCoorsys.csid}" in provided library.`);
        }
        return new Point(coorsys, vectorInCoorsys);
    }

    constructor(readonly coorsys: ICoorsys, vector: IVectorData) {
        this.vector = Vector.fromObject(vector);
    }

    public get csid(): string {
        return this.coorsys.csid;
    }

    // !! what is the best name in/on
    public in(coorsys: ICoorsys): Point {
        const selfInNeutral = this.coorsys.vectorToNeutral(this.vector);
        return new Point(coorsys, coorsys.vectorFromNeutral(selfInNeutral));
    }

    public toObject(): IPointData {
        return {
            // Note: error "'csid' is specified more than once, so this usage will be overwritten" is nonsence
            // @ts-expect-error
            csid: this.csid,
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
