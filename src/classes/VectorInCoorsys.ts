import { ICoorsys } from '../interfaces/ICoorsys';
import { IVector } from '../interfaces/IVector';
import { IVectorInCoorsys } from '../interfaces/IVectorInCoorsys';
import { CoorsysLibrary } from './CoorsysLibrary';
import { Vector } from './Vector';

/**
 * @experimental Maybe better name than VectorInCoorsys
 */
export class VectorInCoorsys implements IVectorInCoorsys {
    [axis: string]: any; // TODO: Better

    readonly vector: Vector;

    public static fromObject(
        coorsysLibrary: CoorsysLibrary<never>,
        vectorInCoorsys: IVectorInCoorsys,
    ): VectorInCoorsys {
        // TODO: Maybe to util function
        return new VectorInCoorsys(coorsysLibrary.getCoorsys(vectorInCoorsys.coorsysName), vectorInCoorsys);
    }

    constructor(readonly coorsys: ICoorsys, vector: IVector) {
        this.vector = Vector.fromObject(vector);
    }

    public get coorsysName(): string {
        return this.coorsys.coorsysName;
    }

    // !!! fulltext search for typo Corsys -> Coorsys aA
    public inCorsys(coorsys: ICoorsys): VectorInCoorsys {
        const selfInNeutral = this.coorsys.vectorToNeutral(this.vector);
        return new VectorInCoorsys(coorsys, coorsys.vectorFromNeutral(selfInNeutral));
    }

    // !!! All operations + axis accessors
}
