
import CoreRule from '../../core/rule.js';

/**
 * Array Bracket Newline
 *
 * This rule enforces consistent spacing inside array brackets.
 *
 * Options:
 *
 *     "always" requires line breaks inside brackets
 *     "never" disallows line breaks inside brackets
 *
 * @see https://eslint.org/docs/rules/array-bracket-spacing
 */
export default class RuleArrayBracketSpacing extends CoreRule
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
        return 'array-bracket-spacing';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        const withSpaces = [...this.input.matchAll(/\[\s+/gsm)];
        const noSpaces = [...this.input.matchAll(/\[[^\s]/gsm)];

        // If we have more items without spaces, change to never
        if (noSpaces.length > withSpaces.length) {
            output = 'never';
        }

        return output;
    }
}
