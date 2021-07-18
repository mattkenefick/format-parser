
import CoreRule from '../../core/rule.js';

/**
 * Comma Dangle
 *
 * Print trailing commas wherever possible in multi-line comma-separated
 * syntactic structures. (A single-line array, for example, never gets
 * trailing commas.)
 *
 * @todo Support `always-multiline` and `only-multiline`
 *
 * Options:
 *
 *     "never" (default) disallows trailing commas
 *     "always" requires trailing commas
 *     "always-multiline" requires trailing commas when the last element or property is in a different line than the closing ] or } and disallows trailing commas when the last element or property is on the same line as the closing ] or }
 *     "only-multiline" allows (but does not require) trailing commas when the last element or property is in a different line than the closing ] or } and disallows trailing commas when the last element or property is on the same line as the closing ] or }
 *
 * @see https://eslint.org/docs/rules/comma-dangle
 */
export default class RuleCommaDangle extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return 'never';
    }

    /**
     * @var string
     */
    get property() {
        return 'comma-dangle';
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
            output = 'always';
        }

        // No trailing commas
        else if (!hasTrailingCommas) {
            output = 'never';
        }

        return output;
    }
}
