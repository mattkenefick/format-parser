
import CoreRule from '../core/rule.js';

/**
 * Quotes
 *
 * Use single quotes instead of double quotes.
 *
 * @see https://prettier.io/docs/en/options.html#quotes
 */
export default class RuleQuotes extends CoreRule
{
    /**
     * @var boolean
     */
    get default() {
        return false;
    }

    /**
     * @var string
     */
    get property() {
        return 'singleQuote';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;

        // Find count of all our quotes
        const singleQuotes = [...this.input.matchAll(/'/gm)];
        const doubleQuotes = [...this.input.matchAll(/"/gm)];

        // No quotes found
        if (singleQuotes.length === 0 && doubleQuotes.length === 0) {
            return this.default;
        }

        // Logic for quotes leans single
        output = singleQuotes.length >= doubleQuotes.length;

        return output;
    }
}
