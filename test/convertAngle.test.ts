import { convertAngle } from '../src/utils/convertAngle';

describe('Converting of angles', () => {
    it('simple conversion', () => {
        expect(convertAngle('(deg)', '(rad)', 60)).toBeCloseTo(Math.PI / 3);
        expect(convertAngle('deg', 'rad', 60)).toBeCloseTo(Math.PI / 3);
        expect(convertAngle('deg', 'grad', 90)).toBeCloseTo(100);
        expect(convertAngle('deg', 'grad', 45)).toBeCloseTo(50);
        expect(convertAngle('deg', 'turn', 60)).toBeCloseTo(1 / 6);
    });

    it('going around', () => {
        expect(convertAngle('deg', 'deg', 400)).toBeCloseTo(40);
        expect(convertAngle('rad', 'rad', Math.PI * 3)).toBeCloseTo(Math.PI);
        expect(convertAngle('rad', 'deg', Math.PI * 3)).toBeCloseTo(180);
        expect(convertAngle('deg', 'grad', -45)).toBeCloseTo(350);
        expect(convertAngle('turn', 'turn', 222)).toBeCloseTo(0);
        expect(convertAngle('turn', 'turn', -333)).toBeCloseTo(0);
        expect(convertAngle('turn', 'turn', -333.33333)).toBeCloseTo(0.66666);
        expect(convertAngle('turn', 'turn', 222.22)).toBeCloseTo(0.22);
    });
});
