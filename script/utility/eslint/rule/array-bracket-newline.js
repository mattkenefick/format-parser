
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


        return output;
    }
}
