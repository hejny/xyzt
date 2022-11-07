import { IVector } from './IVectorData';

export interface ITransformData {
    translate?: IVector;
    // center?: IVector;
    rotate?: number | IVector;
    scale?: number | IVector;
    // Note: Skew will be available in the future> skew?: IVector;
}
