import { IVector } from '../main';

/**
 * @experimental
 * Maybe better name than ICorsys
 */
export interface ICoorsys {
    csid: string;
    vectorToNeutral(vectorInThisSystem: IVector): IVector;
    vectorFromNeutral(vectorInNeutralSystem: IVector): IVector;
}
