import { Vector } from '../src/classes/Vector';
import { stripInfatesimal } from '../src/utils/stripInfatesimal';

describe('behaviour of obvious numbers to prevent strange javascript decimal places', () => {
    it('works with pure function stripInfatesimals', () => {
        for (const sign of [1, -1]) {
            expect(stripInfatesimal(sign * 0)).toEqual(0);
            expect(stripInfatesimal(sign * 1)).toEqual(sign * 1);
            expect(stripInfatesimal(sign * 10000000)).toEqual(sign * 10000000);
            expect(stripInfatesimal(sign * 10000001)).toEqual(sign * 10000001);
            expect(stripInfatesimal(sign * 999999.0000000001)).toEqual(sign * 999999);
            expect(stripInfatesimal(sign * 1.000000000000001)).toEqual(sign * 1);
            expect(stripInfatesimal(sign * 1.000000000000004)).toEqual(sign * 1);
            expect(stripInfatesimal(sign * 1.000000000000009)).toEqual(sign * 1);
            expect(stripInfatesimal(sign * 1.000000000000084)).toEqual(sign * 1);
            expect(stripInfatesimal(sign * 1.00000000000001)).toEqual(sign * 1);
            expect(stripInfatesimal(sign * 1.000000000000011)).toEqual(sign * 1);
            expect(stripInfatesimal(sign * 1.111111111111111)).toEqual(sign * 1.111111111111111);
            expect(stripInfatesimal(sign / 10)).toEqual(sign / 10);
            expect(stripInfatesimal(sign / 100)).toEqual(sign / 100);
            expect(stripInfatesimal(sign / 200)).toEqual(sign / 200);
            expect(stripInfatesimal(sign / 1000)).toEqual(sign / 1000);
            expect(stripInfatesimal(sign / 50000)).toEqual(sign / 50000);
            expect(stripInfatesimal(sign * 0.0000000000000001)).toEqual(0);
            expect(stripInfatesimal(sign * 0.00000000000000015)).toEqual(0);
            expect(stripInfatesimal(sign * 0.0000000000000002)).toEqual(0);
            expect(stripInfatesimal(sign * 0.000000000000001)).toEqual(sign * 0.000000000000001);
            expect(stripInfatesimal(sign * 0.000000000000004)).toEqual(sign * 0.000000000000004);
            expect(stripInfatesimal(sign * Infinity)).toEqual(sign * Infinity);
            expect(stripInfatesimal(sign * 0.5000000000000001)).toEqual(sign * 0.5);
            expect(stripInfatesimal(sign * 6.123233995736766e-17)).toEqual(0);
            expect(stripInfatesimal(sign * 0.0005000000000001)).toEqual(sign * 0.0005);
            expect(stripInfatesimal(sign * 0.0050000000000001)).toEqual(sign * 0.005);
            expect(stripInfatesimal(sign * 0.0500000000000001)).toEqual(sign * 0.05);
            expect(stripInfatesimal(sign * 0.5000000000000001)).toEqual(sign * 0.5);
            expect(stripInfatesimal(sign * 5.0000000000000001)).toEqual(sign * 5);
            expect(stripInfatesimal(sign * 1.4999999999999999)).toEqual(sign * 1.5);
            expect(stripInfatesimal(sign * 1.4999999999999998)).toEqual(sign * 1.5);
            // TODO: expect(stripInfatesimal(sign * 1.4449999999999998)).toEqual(sign * 1.444);
        }
        expect(stripInfatesimal(NaN)).toEqual(NaN);
    });
    it('repair vector with stripInfatesimals', () => {
        expect(new Vector(1.000000000000004).stripInfatesimals()).toEqual(new Vector(1));
    });
});
