
import CoreRule from '../../core/rule.js';

/**
 * Array Bracket Newline
 *
 * This rule enforces line breaks after opening and before closing array brackets.
 *
 * Options:
 *
 *     "always" requires line breaks inside brackets
 *     "never" disallows line breaks inside brackets
 *     "consistent" requires consistent usage of linebreaks for each pair of brackets.
 *
 * @see https://eslint.org/docs/rules/array-bracket-newline
 */
export default class RuleArrayBracketNewline extends CoreRule
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
        return 'array-bracket-newline';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        const breakingBrackets = [...this.input.matchAll(/\[\s*\n/gsm)];
        const nonBreakingBrackets = [...this.input.matchAll(/\[[^\n\s]/gsm)];

        // If we use nonbreaking brackets, we can't use "always"
        if (nonBreakingBrackets.length) {
            output = 'consistent';
        }

        // If we never use breaking brackets, but do use nonbreaking
        // @todo check this logic, because disallowing breaking brackets may be hasty
        if (!breakingBrackets.length && nonBreakingBrackets.length) {
            output = 'never';
        }
        else if (nonBreakingBrackets.length) {
            output = 'consistent';
        }

        return output;
    }
}
