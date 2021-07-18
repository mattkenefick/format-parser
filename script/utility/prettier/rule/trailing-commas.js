
import CoreRule from '../../core/rule.js';

/**
 * TrailingCommas
 *
 * Print trailing commas wherever possible in multi-line comma-separated syntactic structures. (A single-line array, for example, never gets trailing commas.)
 *
 * @see https://prettier.io/docs/en/options.html#trailing-commas
 */
export default class RuleTrailingCommas extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return 'es5';
    }

    /**
     * @var string
     */
    get property() {
        return 'trailingCommas';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;
        let hasTrailingCommas = false;
        let hasNonTrailingCommas = false;

        // Determine if any have quotes
        this.arrayBrackets.forEach(block => {
            block = `{${block}}`;

            // Checks for objects the end with a comma
            hasTrailingCommas = [...block.matchAll(/,\s*[})]/gms)].length > 0 || hasTrailingCommas;

            // Checks for lines that end without commas but also exist across
            // multiple lines (as to avoid single line arrays)
            hasNonTrailingCommas = [...block.matchAll(/[a-zA-Z'"\]\}]\s*\n\s*[})]/gms)].length > 0 || hasNonTrailingCommas;
        });

        // Determine if any have quotes
        this.objectBlocks.forEach(block => {
            block = `{${block}}`;

            // Checks for objects the end with a comma
            hasTrailingCommas = [...block.matchAll(/,\s*[})]/gms)].length > 0 || hasTrailingCommas;

            // Checks for lines that end without commas but also exist across
            // multiple lines (as to avoid single line arrays)
            hasNonTrailingCommas = [...block.matchAll(/[a-zA-Z'"\]\}]\s*\n\s*[})]/gms)].length > 0 || hasNonTrailingCommas;
        });

        // Set consistent if we don't mix quotes
        if (hasTrailingCommas && !hasNonTrailingCommas) {
            output = 'all';
        }

        // No trailing commas
        else if (!hasTrailingCommas) {
            output = 'none';
        }

        return output;
    }
}
