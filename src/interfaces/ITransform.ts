import { IVector } from '../../dist/typings/src/main';

export interface ITransform {
    translate?: IVector;
    rotate?: number | IVector;
    skew?: IVector;
    scale?: number | IVector;
}
