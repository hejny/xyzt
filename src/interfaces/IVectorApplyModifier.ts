import { Vector } from '../classes/Vector';
import { IVectorData } from './IVectorData';

export type IVectorApplyModifierFunction = (vector: Vector) => IVectorData;
export type IAppliableOnVector = {
    applyOnVector: IVectorApplyModifierFunction;
};

export type IVectorApplyModifier = IVectorApplyModifierFunction | IAppliableOnVector;
