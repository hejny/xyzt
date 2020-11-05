import { ITransform } from './ITransform';

export interface IBoundingBox {
    transform: ITransform;
    applyTransform(transform: ITransform): void;
}
