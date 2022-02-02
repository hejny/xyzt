import { Transform } from '../classes/Transform';
import { ITransformData } from './ITransformData';

export type ITransformApplyModifierFunction = (Transform: Transform) => ITransformData;
export type IAppliableOnTransform = {
    applyOnTransform: ITransformApplyModifierFunction;
};

export type ITransformApplyModifier = ITransformApplyModifierFunction | IAppliableOnTransform;
