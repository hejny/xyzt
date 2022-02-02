import { IVectorData } from '../interfaces/IVectorData';

/**
 * @experimental
 * Maybe better name than ICorsys
 */
export interface ICoorsys {
    csid: string;
    vectorToNeutral(vectorInThisSystem: IVectorData): IVectorData;
    vectorFromNeutral(vectorInNeutralSystem: IVectorData): IVectorData;
}
