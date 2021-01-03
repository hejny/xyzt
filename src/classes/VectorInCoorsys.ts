import { ICoorsys } from '../interfaces/ICoorsys';
import { IVector } from '../interfaces/IVector';
import { IVectorInCoorsys } from '../interfaces/IVectorInCoorsys';
import { Vector } from './Vector';

/**
 * @experimental Maybe better name than VectorInCoorsys !!! What about Point
 */
export class VectorInCoorsys implements IVectorInCoorsys {
    [axis: string]: any; // TODO: Better

    readonly vector: Vector;

    public static fromObject(coorsysLibrary: ICoorsys[], vectorInCoorsys: IVectorInCoorsys): VectorInCoorsys {
        const coorsys = coorsysLibrary.find(({ coorsysName }) => coorsysName === vectorInCoorsys.coorsysName);
        if (!coorsys) {
            throw new Error(`Can not find "${vectorInCoorsys.coorsysName}" in provided library.`);
        }
        return new VectorInCoorsys(coorsys, vectorInCoorsys);
    }

    constructor(readonly coorsys: ICoorsys, vector: IVector) {
        this.vector = Vector.fromObject(vector);
    }

    public get coorsysName(): string {
        return this.coorsys.coorsysName;
    }

    // !! what is the best name in/on
    public in(coorsys: ICoorsys): VectorInCoorsys {
        const selfInNeutral = this.coorsys.vectorToNeutral(this.vector);
        return new VectorInCoorsys(coorsys, coorsys.vectorFromNeutral(selfInNeutral));
    }

    public toObject(): IVectorInCoorsys {
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
