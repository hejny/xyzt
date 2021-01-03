import { ICoorsys } from '../interfaces/ICoorsys';
import { IVector } from '../interfaces/IVector';
import { ITransform } from '../interfaces/ITransform';
import { Transform } from './Transform';
import { Vector } from './Vector';

export class Coorsys extends Transform implements ICoorsys {
    public readonly coorsysName: string;

    constructor(coorsysName: string, transform: ITransform) {
        const { translate, rotate, scale } = Transform.fromObject(transform);
        super(translate, rotate, scale);
        this.coorsysName = coorsysName;
        // Note: I am assigning coorsysName here not by readonly syntax sugar because of TS error "A 'super' call must be the first statement in the constructor when a class contains initialized properties, parameter properties, or private identifiers.".
    }

    public createRelatedCoorsys(coorsysName: string, transform: ITransform) {
        return new Coorsys(coorsysName, this.apply(Transform.fromObject(transform)));
    }

    public vectorToNeutral(vectorInThisSystem: IVector): Vector {
        return this.applyOnVector(vectorInThisSystem);
    }

    public vectorFromNeutral(vectorInNeutralSystem: IVector): Vector {
        return this.inverse().applyOnVector(vectorInNeutralSystem);
    }
}