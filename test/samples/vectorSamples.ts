import { Vector } from '../../src/classes/Vector';

export const vectorSamples = [
    Vector.zero(),
    Vector.cube(),
    Vector.cube(1.2),
    Vector.cube(-6),
    new Vector(1, 2),
    new Vector(2, 3),
    new Vector(1, 200),
    new Vector(100, 200),
    new Vector(999999, 99999),
    new Vector(1, 2, 3),
    new Vector(50, 3, -7),
];
