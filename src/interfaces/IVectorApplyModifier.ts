import { IVector } from './IVector';
import { Vector } from '../classes/Vector';

export type IVectorApplyModifierFunction = (vector: Vector) => IVector;
export type IAppliableOnVector = {
    applyOnVector: IVectorApplyModifierFunction;
};

export type IVectorApplyModifier =
    | IVectorApplyModifierFunction
    | IAppliableOnVector;
