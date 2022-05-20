/**
 * Array with at least one item
 */
export type ArrayFull<T> = {
    0: T;
} & T[];

/**
 * Array with at least two items
 */
export type ArrayFull2<T> = {
    0: T;
    1: T;
} & T[];
