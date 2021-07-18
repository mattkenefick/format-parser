
import CoreRule from '../../core/rule.js';

/**
 * Array Element Newline
 *
 * This rule enforces line breaks between array elements.
 *
 * Options:
 *
 *    "always" (default) requires line breaks between array elements
 *    "never" disallows line breaks between array elements
 *    "consistent" requires consistent usage of linebreaks between array elements
 *
 * @see https://eslint.org/docs/rules/array-element-newline
 */
export default class RuleArrayElementNewline extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return 'always';
    }

    /**
     * @var string
     */
    get property() {
        return 'array-element-newline';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        // Loop through arrays to determine how many commas are in each
        // and what the respective line breaks are
        this.arrayBrackets.forEach(bracket => {
            const commaCount = (bracket.match(/,/gms) || []).length;
            const breakCount = (bracket.match(/,\s*\n/gms) || []).length;

            if (breakCount < commaCount) {
                output = 'consistent';
            }
        });

        return output;
    }
}
