
import CoreRule from '../core/rule.js';

/**
 * QuoteProps
 *
 * Change when properties in objects are quoted.
 *
 * @see https://prettier.io/docs/en/options.html#quote-props
 */
export default class RuleQuoteProps extends CoreRule
{
    /**
     * @var string
     */
    get default() {
        return 'as-needed';
    }

    /**
     * @var string
     */
    get property() {
        return 'quoteProps';
    }

    /**
     * Mandatory entry function to create a decision
     *
     * @return boolean
     */
    identify() {
        let output = this.default;
        let hasQuotes = false;
        let hasNoQuotes = false;

        // Find object blocks
        const blocks = [...this.input.matchAll(/=\s*{(.*?)}/gms)];

        // Determine if any have quotes
        blocks.forEach(block => {
            if (!hasQuotes) {
                hasQuotes = !!block[0].match(/['"]\s*:/);
            }

            if (!hasNoQuotes) {
                hasNoQuotes = !!block[0].match(/[^'"]\s*:/);
            }
        });

        // Set consistent if we don't mix quotes
        if ((!hasQuotes && hasNoQuotes) || (hasQuotes && !hasNoQuotes)) {
            output = 'consistent';
        }

        return output;
    }
}
