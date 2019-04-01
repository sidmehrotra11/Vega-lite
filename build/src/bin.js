import { isBoolean, isObject } from 'vega-util';
import { COLOR, COLUMN, FILL, FILLOPACITY, OPACITY, ROW, SHAPE, SIZE, STROKE, STROKEOPACITY, STROKEWIDTH } from './channel';
import { normalizeBin } from './channeldef';
import { keys, varName } from './util';
/**
 * Create a key for the bin configuration. Not for prebinned bin.
 */
export function binToString(bin) {
    if (isBoolean(bin)) {
        bin = normalizeBin(bin, undefined);
    }
    return ('bin' +
        keys(bin)
            .map(p => varName(`_${p}_${bin[p]}`))
            .join(''));
}
/**
 * Vega-Lite should bin the data.
 */
export function isBinning(bin) {
    return bin === true || (isBinParams(bin) && !bin.binned);
}
/**
 * The data is already binned and so Vega-Lite should not bin it again.
 */
export function isBinned(bin) {
    return bin === 'binned' || (isBinParams(bin) && bin.binned);
}
export function isBinParams(bin) {
    return isObject(bin);
}
export function autoMaxBins(channel) {
    switch (channel) {
        case ROW:
        case COLUMN:
        case SIZE:
        case COLOR:
        case FILL:
        case STROKE:
        case STROKEWIDTH:
        case OPACITY:
        case FILLOPACITY:
        case STROKEOPACITY:
        // Facets and Size shouldn't have too many bins
        // We choose 6 like shape to simplify the rule
        case SHAPE:
            return 6; // Vega's "shape" has 6 distinct values
        default:
            return 10;
    }
}
//# sourceMappingURL=bin.js.map