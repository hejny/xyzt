/**
 * Infinitesimal small number
 * This "stupidity" is here because javascript is sometimes not precise in the last decimal digit
 * See tests of stripInfatesimals
 * TODO: Move to indipendent library
 */
export const ε = 0.0000000000000002;

/**
 * Threshold bellow which are decimal numbers so negligible that can be stripped from its main part
 * See tests of stripInfatesimals
 */
export const NEGLIGIBLE_THRESHOLD = 0.000000001;
