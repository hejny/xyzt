import { IVector } from '../main';

/**
 * @experimental Maybe better name than VectorInCoorsys
 */
export interface ICoorsys {
    // TODO: !!! csid
    coorsysName: string;
    vectorToNeutral(vectorInThisSystem: IVector): IVector;
    vectorFromNeutral(vectorInNeutralSystem: IVector): IVector;
}
