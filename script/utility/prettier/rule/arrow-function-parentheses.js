
import CoreRule from '../core/rule.js';

/**
 * Arrow Function Parentheses
 *
 * Include parentheses around a sole arrow function parameter.
 *
 * @see https://prettier.io/docs/en/options.html#arrow-function-parentheses
 */
export default class RuleArrowFunctionParentheses extends CoreRule
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
        return 'arrowParens';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        const parentheses = [...this.input.matchAll(/[)]\s*=>/gms)].length;
        const noParentheses = [...this.input.matchAll(/[a-zA-Z0-9]\s*=>/gms)].length;

        // We have more non-spaced brackets than spaced brackets
        if (noParentheses > parentheses) {
            output = 'avoid';
        }

        return output;
    }
}
