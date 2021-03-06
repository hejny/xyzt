import { IVector } from './IVector';

export interface ITransform {
    translate?: IVector;
    // center?: IVector;
    rotate?: number | IVector;
    scale?: number | IVector;
    // Note: Skew will be available in the future> skew?: IVector;
}
