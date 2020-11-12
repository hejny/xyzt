import { showValueWithUnit } from '../src/utils/showValueWithUnit';

describe('Showing value with unit', () => {
    it('simple', () => {
        expect(showValueWithUnit('rad', 2, 0)).toBe('0rad');
        expect(showValueWithUnit('deg', 2, 12.3456789)).toBe('12.35deg');
        expect(showValueWithUnit('grad', 2, 12.3456789)).toBe('12.35grad');
    });

    it('fractionDigits', () => {
        expect(showValueWithUnit('(px)', 0, 0.3456789)).toBe('0');
        expect(showValueWithUnit('(px)', 1, 0.44444)).toBe('0.4');
        expect(showValueWithUnit('(px)', 0, 12.3456789)).toBe('12');
        expect(showValueWithUnit('(px)', -1, 12.3456789)).toBe('10');
        expect(showValueWithUnit('(px)', 1, 12.3456789)).toBe('12.3');
        expect(showValueWithUnit('(px)', 7, 12.3456789)).toBe('12.3456789');
        expect(() =>
            showValueWithUnit('(px)', 1000, 12.3456789),
        ).toThrowError();
    });

    it('rounding', () => {
        expect(showValueWithUnit('(px)', 0, 12.99)).toBe('13');
        expect(showValueWithUnit('(px)', 1, 12.77)).toBe('12.8');
        expect(showValueWithUnit('(px)', 1, 12.75)).toBe('12.8');
        expect(showValueWithUnit('(px)', 2, 12.3456789)).toBe('12.35');
        expect(showValueWithUnit('(px)', 3, 12.3456789)).toBe('12.346');
    });

    it('hidden unit', () => {
        expect(showValueWithUnit('(px)', 2, 12.3456789)).toBe('12.35');
        expect(showValueWithUnit('(rad)', 2, 12.3456789)).toBe('12.35');
    });
});
