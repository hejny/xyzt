import { ITransformStyleFormat } from '../styleFormat/ITransformStyleFormat';
import { transformToStyle } from './transformToStyle';

const SVG_FORMAT: ITransformStyleFormat = {
    dimensionUnit: '(px)',
    angleUnit: '(deg)',
    valuesDelimiter: ' ',
    fractionDigits: 3,
};

export const transformToStyleSvg = transformToStyle.bind(null, SVG_FORMAT);
