import { Transform } from '../src/classes/Transform';
import { Vector } from '../src/classes/Vector';

export const transformBasicSamples = [
    Transform.neutral(),
    Transform.translate(new Vector(1, 2)),
    Transform.rotate(Math.PI / 3),
    Transform.scale(5),
];
