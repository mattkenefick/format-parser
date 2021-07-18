
import CoreRule from '../../core/rule.js';

/**
 * Array Bracket Spacing
 *
 * This rule enforces consistent spacing inside array brackets.
 *
 * Options:
 *     "never" (default) disallows spaces inside array brackets
 *     "always" requires one or more spaces or newlines inside array brackets
 *
 * @see https://eslint.org/docs/rules/array-bracket-spacing
 */
export default class RuleArrayBracketSpacing extends CoreRule
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

        // If we have more items with spaces, change to always
        if (noSpaces.length < withSpaces.length) {
            output = 'always';
        }

        return output;
    }
}
