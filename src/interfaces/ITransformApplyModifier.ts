import { Transform } from '../classes/Transform';
import { ITransform } from './ITransform';

export type ITransformApplyModifierFunction = (Transform: Transform) => ITransform;
export type IAppliableOnTransform = {
    applyOnTransform: ITransformApplyModifierFunction;
};

export type ITransformApplyModifier = ITransformApplyModifierFunction | IAppliableOnTransform;
