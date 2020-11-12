import { showValue } from '../src/utils/showValue';

describe('Showing value', () => {
    it('fractionDigits', () => {
        expect(showValue(0, 0.3456789)).toBe('0');
        expect(showValue(1, 0.44444)).toBe('0.4');
        expect(showValue(0, 21.3456789)).toBe('21');
        expect(showValue(-1, 21.3456789)).toBe('20');
        expect(showValue(1, 21.3456789)).toBe('21.3');
        expect(showValue(7, 21.3456789)).toBe('21.3456789');
        expect(() => showValue(1000, 21.3456789)).toThrowError();
    });

    it('rounding', () => {
        expect(showValue(0, 21.99)).toBe('22');
        expect(showValue(1, 21.77)).toBe('21.8');
        expect(showValue(1, 21.75)).toBe('21.8');
        expect(showValue(2, 21.3456789)).toBe('21.35');
        expect(showValue(3, 21.3456789)).toBe('21.346');
    });
});
