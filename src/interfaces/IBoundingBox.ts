import { ITransformData } from './ITransformData';

export interface IBoundingBox {
    transform: ITransformData;
    applyTransform(transform: ITransformData): void;
}
