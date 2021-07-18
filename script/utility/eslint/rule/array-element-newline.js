
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

        this.arrayBrackets.forEach(bracket => {
            console.log(bracket);
            const commaCount = (bracket.match(/,/gms) || []).length;
            console.log('sup', commaCount);
        });

        // const breakingBrackets = [...this.input.matchAll(/\[\s*\n/gsm)];
        // const nonBreakingBrackets = [...this.input.matchAll(/\[[^\n]/gsm)];

        // // If we use nonbreaking brackets, we can't use "always"
        // if (nonBreakingBrackets.length) {
        //     output = 'consistent';
        // }

        // // If we never use breaking brackets, but do use nonbreaking
        // // @todo check this logic, because disallowing breaking brackets may be hasty
        // if (!breakingBrackets.length && nonBreakingBrackets.length) {
        //     output = 'never';
        // }
        // else if (nonBreakingBrackets.length) {
        //     output = 'consistent';
        // }

        return output;
    }
}
