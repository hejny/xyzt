import { IVectorData } from './IVectorData';

export interface ITransformData {
    translate?: IVectorData;
    // center?: IVector;
    rotate?: number | IVectorData;
    scale?: number | IVectorData;
    // Note: Skew will be available in the future> skew?: IVector;
}
