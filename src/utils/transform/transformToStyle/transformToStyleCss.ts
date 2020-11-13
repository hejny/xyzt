import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';
import { transformToStyle } from './transformToStyle';

export const CSS_FORMAT: ITransformStyleFormat = {
    dimensionUnit: 'px',
    angleUnit: 'deg',
    valuesDelimiter: ',',
    fractionDigits: 3,
};

export const transformToStyleCss = transformToStyle.bind(null, CSS_FORMAT);
